import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from 'src/app/shared/map/map.service';
import { MarketplaceService } from 'src/app/feature-modules/marketplace/marketplace.service';
import { Tour } from "../../tour-authoring/tour/model/tour.model";
import { PagedResults } from "../../../shared/model/paged-results.model";
import { GoogleAnalyticsService } from "../../../infrastructure/google-analytics/google-analytics.service";
import { forkJoin } from "rxjs";
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { OrderItem, ShoppingCart } from '../model/shopping-cart.model';
import { TourPurchaseToken } from '../model/TourPurchaseToken.model';

@Component({
  selector: 'xp-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css']
})
export class TourSearchComponent implements OnInit {

  range: number = 0;
  latitude: number = 0;
  longitude: number = 0;
  discount: number = 0;
  isListVisible: boolean = false;

  tokens: TourPurchaseToken[] = []

  tours: Tour[] = [];
  toursfil: Tour[] = [];
  toursDiscMap = new Map<number, number>();
  brTura: number = 0;

  selectedValue = '0';
  shoppingCart: ShoppingCart = {} as ShoppingCart;
  isTourist = false;

  constructor(private service: MarketplaceService,
              private cordinateService: MapService,
              private googleAnalytics: GoogleAnalyticsService,
              private auth: AuthService
  ) {}

  searchForm = new FormGroup({
    range: new FormControl(0, [Validators.min(0), Validators.required]),
    searchType: new FormControl('', Validators.required),
    length: new FormControl(0, [Validators.min(0), Validators.required]),
  });

  ngOnInit() {
    this.googleAnalytics.sendPageView(window.location.pathname);
    console.log(window.location.pathname);
    this.getShoppingCart();
    this.getPurchasedTours();
    this.cordinateService.coordinate$.subscribe((coordinates) => {
      this.latitude = coordinates.lat;
      this.longitude = coordinates.lng;
    });
  }

  updateSliderValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.discount = parseInt(value);
  }

  getPurchasedTours(): void {
    this.service.getAllTokens().subscribe({
      next: (result) => {
        this.tokens = result.results;
        console.log(this.tokens.length);
      },
      error: () => {
      }
    })
  }

  getShoppingCart(): void{
    this.auth.user$.subscribe((user) => {
      if (user.username) {
        if(user.role === "tourist") {
          this.isTourist = true;
        }
        const userId = user.id;

        this.service.getShoppingCart(userId).subscribe({
          next: (data: ShoppingCart) => {
            this.shoppingCart = data;
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    });

  }

  isInCart(id: number | undefined): number {
    if (id === undefined) {
      return -1;
    }
    if (this.shoppingCart.orderItems.some(item => item.idTour === id)) {
      return 1;
    }
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].idTour === id) {
        return 2;
      }
    }
    return 0;
  }

  addToCart(id: number | undefined, name: string, price: number): void { //popust mozda
    if(true){
      const newOrderItem: OrderItem = {
        tourName: name,
        price: price,
        idTour: id!
      };
      this.shoppingCart.orderItems.push(newOrderItem);
      this.service.addOrderItem(this.shoppingCart).subscribe({
        next: (data: ShoppingCart) => {
          console.log(this.shoppingCart);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  search(): void {
    this.tours = [];
    this.toursfil = [];
    if (this.searchForm.valid && this.latitude != 0 && this.longitude != 0) {

      this.service.getToursByLocation(this.latitude, this.longitude, this.searchForm.value.range || 0, this.searchForm.value.searchType || '0').subscribe({
        next: (result: PagedResults<Tour>) => {
          this.isListVisible = true;
          this.tours = result.results; // ture koje odgovaraju prema udaljenosti
          this.brTura = this.tours.length; // njihov broj

          // dodao sam textbox i za distancu ali jos nisam napravio da po njoj filtrira
          // mozes ovde na frontu da izfiltriras po tome sto hoces





          //
          this.getDiscounts();
          console.log(this.brTura);

          if(this.searchForm.value.range) {
            this.cordinateService.setRadius(this.searchForm.value.range);
            this.cordinateService.setArrayCoordinates(this.tours);
          }
        },
        error: (err) => {
          this.isListVisible = false;
          console.error('Error: ', err);
        }
      });
    }
  }

  getDiscounts(): void {
    const observables = this.tours.map((tour) =>
      this.service.getTourDiscount(tour.id || -1)
    );

    forkJoin(observables).subscribe({
      next: (results: number[]) => {
        results.forEach((result, index) => {
          const tour = this.tours[index];

          this.toursDiscMap.set(tour.id || -1, result);

          const discValue = this.toursDiscMap.get(tour.id || -1);

          if (discValue !== undefined && discValue >= this.discount) {
            this.toursfil.push(tour);
          } else {
            this.brTura--;
          }
        });

        this.toursfil.sort((a, b) => a.id! - b.id!);
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  getDisc(id: any, price: any): number {
    const disc = this.toursDiscMap.get(id);
    if (disc !== undefined) {
      return Math.floor((100 - disc) * price / 100);
    } else {
      return price;
    }
  }
}
