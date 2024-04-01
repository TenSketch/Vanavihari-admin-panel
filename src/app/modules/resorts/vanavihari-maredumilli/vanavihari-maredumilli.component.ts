import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { RoomsComponent } from '../rooms/rooms.component';
import { AuthService } from '../../../../app/auth.service';
// import { UserService } from '../../user.service';
import { SharedService } from '../../../shared.service';
import { Subscription } from 'rxjs';

interface Room {
  //roomId:string;
  name: string;
  cottage_type: string;
  // bed_type: string;
  // amenities: string[];
  // rating: string;
  week_day_rate: number;
  week_end_rate: number;
  week_day_guest_charge: number;
  week_end_guest_charge: number;
  image: string;
  max_adult: number;
  // max_child: number;
  max_guest: number;
}

@Component({
  selector: 'app-vanavihari-maredumilli',
  templateUrl: './vanavihari-maredumilli.component.html',
  styleUrls: ['./vanavihari-maredumilli.component.scss'],
})
export class VanavihariMaredumilliComponent {
  private fetchRoomListSubscription: Subscription;
  selectedSortOption: string;
  showBookingSummary: boolean = false;
  roomCards: any[] = [];
  roomIds: any[] = [];
  loadingRooms: boolean = true;
  selectedResort: string = '';
  checkinDate: Date;
  checkoutDate: Date;
  selected: string = '';
  isChecked: boolean = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.selectedSortOption = 'lowToHigh';

    if(this.authService.getSearchData("resort") != '' && this.authService.getSearchData("checkin") != '' && this.authService.getSearchData("checkout") != '') {
      this.staticRoomsDetails();
    } else this.fetchRoomList();
  }

  ngOnInit(): void {
    this.roomIds = (this.authService.getBookingRooms() != null && this.authService.getBookingRooms() != '' && this.authService.getBookingRooms().length > 0) ? this.authService.getBookingRooms() : [];
    if (this.roomIds.length > 0) {
      this.showBookingSummary = true;
    }
    this.fetchRoomListSubscription = this.sharedService.fetchRoomList$.subscribe(() => {
      this.fetchRoomList();
    });
  }

  staticRoomsDetails() {
    interface RoomDetails {
      id: string;
      week_day_bed_charge: number;
      cottage_type: string;
      max_guest: string;
      week_day_rate: number;
      week_end_bed_charge: number;
      week_end_rate: number;
      name: string;
      resort: string;
      max_adult: number;
    }    
    // // Sample JSON object with the defined type
    const json: { [key: string]: RoomDetails } = {
      "4554333000000159043": {
        id: '4554333000000159043',
        week_day_bed_charge: 500,
        cottage_type: "Wooden Cottages",
        max_guest: "4",
        week_day_rate: 4000,
        week_end_bed_charge: 700,
        week_end_rate: 4500,
        name: "BULBUL",
        resort: "Vanavihari, Maredumilli",
        max_adult: 4
    },
    "4554333000000159087": {
        id: '4554333000000159087',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Vanya",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000159121": {
        id: '4554333000000159121',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Jabilli",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000159067": {
        id: '4554333000000159067',
        week_day_bed_charge: 500,
        cottage_type: "Vihari",
        max_guest: "2",
        week_day_rate: 4000,
        week_end_bed_charge: 700,
        week_end_rate: 4500,
        name: "PAMULERU",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000159061": {
        id: '4554333000000159061',
        week_day_bed_charge: 500,
        cottage_type: "Vihari",
        max_guest: "3",
        week_day_rate: 4000,
        week_end_bed_charge: 700,
        week_end_rate: 4500,
        name: "SOKULERU",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000159081": {
        id: '4554333000000159081',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Prana",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000148003": {
        id: '4554333000000148003',
        week_day_bed_charge: 500,
        cottage_type: "Permanent Cottage",
        max_guest: "",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "Test Room",
        resort: "Jungle Star, Valamuru",
        max_adult: 2
    },
    "4554333000000159109": {
        id: '4554333000000159109',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Ambara",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000110059": {
        id: '4554333000000110059',
        week_day_bed_charge: 500,
        cottage_type: "Hill Top Guest House",
        max_guest: "",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "Panther",
        resort: "Vanavihari, Maredumilli",
        max_adult: 2
    },
    "4554333000000159127": {
        id: '4554333000000159127',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Vennela",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000159007": {
        id: '4554333000000159007',
        week_day_bed_charge: 500,
        cottage_type: "Pre-Fabricated Cottages",
        max_guest: "2",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "CHOUSINGHA",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000159025": {
        id: '4554333000000159025',
        week_day_bed_charge: 500,
        cottage_type: "Deluxe Rooms",
        max_guest: "5",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "BAHUDA",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000110053": {
        id: '4554333000000110053',
        week_day_bed_charge: 500,
        cottage_type: "Hill Top Guest House",
        max_guest: "",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "Bonnet",
        resort: "Vanavihari, Maredumilli",
        max_adult: 2
    },
    "4554333000000159103": {
        id: '4554333000000159103',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Aditya",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000159049": {
        id: '4554333000000159049',
        week_day_bed_charge: 500,
        cottage_type: "Wooden Cottages",
        max_guest: "2",
        week_day_rate: 4000,
        week_end_bed_charge: 700,
        week_end_rate: 4500,
        name: "WOODPECKER",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000159031": {
        id: '4554333000000159031',
        week_day_bed_charge: 500,
        cottage_type: "Deluxe Rooms",
        max_guest: "4",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "TAPATHI",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000159055": {
        id: '4554333000000159055',
        week_day_bed_charge: 500,
        cottage_type: "Wooden Cottages",
        max_guest: "3",
        week_day_rate: 4000,
        week_end_bed_charge: 700,
        week_end_rate: 4500,
        name: "KINGFISHER",
        resort: "Vanavihari, Maredumilli",
        max_adult: 4
    },
    "4554333000000159133": {
        id: '4554333000000159133',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Agathi",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000159093": {
        id: '4554333000000159093',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Prakruti",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000159073": {
        id: '4554333000000159073',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Aranya",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    },
    "4554333000000159019": {
        id: '4554333000000159019',
        week_day_bed_charge: 500,
        cottage_type: "Deluxe Rooms",
        max_guest: "4",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "NARMADA",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000159013": {
        id: '4554333000000159013',
        week_day_bed_charge: 500,
        cottage_type: "Pre-Fabricated Cottages",
        max_guest: "3",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "SAMBAR",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000110065": {
        id: '4554333000000110065',
        week_day_bed_charge: 500,
        cottage_type: "Pre-Fabricated Cottages",
        max_guest: "",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "Bear",
        resort: "Vanavihari, Maredumilli",
        max_adult: 2
    },
    "4554333000000110141": {
        id: '4554333000000110141',
        week_day_bed_charge: 500,
        cottage_type: "Pre-Fabricated Cottages",
        max_guest: "",
        week_day_rate: 2500,
        week_end_bed_charge: 700,
        week_end_rate: 3500,
        name: "Chital",
        resort: "Vanavihari, Maredumilli",
        max_adult: 3
    },
    "4554333000000159037": {
        id: '4554333000000159037',
        week_day_bed_charge: 500,
        cottage_type: "Wooden Cottages",
        max_guest: "4",
        week_day_rate: 4000,
        week_end_bed_charge: 700,
        week_end_rate: 4500,
        name: "HORNBILL",
        resort: "Vanavihari, Maredumilli",
        max_adult: 4
    },
    "4554333000000159115": {
        id: '4554333000000159115',
        week_day_bed_charge: 1500,
        cottage_type: "Permanent Cottage",
        max_guest: "2",
        week_day_rate: 5000,
        week_end_bed_charge: 1750,
        week_end_rate: 7500,
        name: "Avani",
        resort: "Jungle Star, Valamuru",
        max_adult: 3
    }
    };
    const jsonArray = Object.keys(json).map(key => {
        return json[key];
        // return {
        //   id: key,
        //   ...json[key]
        // };
    });
    this.roomCards = this.mapRoomData(jsonArray, this.roomIds);

    setTimeout(() => {
       this.loadingRooms = false;
    }, 2000);
  }
  
  ngOnDestroy() {
    if (this.fetchRoomListSubscription) {
      this.fetchRoomListSubscription.unsubscribe();
    }
  }
  // roomCards: any[] = Array.from({ length: 1 }, (_, index) => ({
  //   roomName: 'Wood Pecker',
  //   cottageType: 'Wooden Cottages',
  //   bedType: '1 King Size double bed',
  //   amenities: ['AC', 'Geyser', 'Western Toilet'],
  //   rating: 'Good',
  //   price:
  //     '1 night, 3 adults, 1 child 4500 INR + GST @ 18%  Extra bed @ 1500 INR',
  //   image: 'assets/img/jungle.jpeg',
  // }));

  fetchRoomList() {
    if(this.selectedResort != '' && this.checkinDate != null && this.checkoutDate != null) {
      let perm = '';
      if(this.selectedResort) perm += `&resort=${this.selectedResort}`;
      if(this.checkinDate) perm += `&checkin=${this.checkinDate}`;
      if(this.checkoutDate) perm += `&checkout=${this.checkoutDate}`;
      this.http
        .get<any>(
          'https://vanavihari-ng.netlify.app/zoho-connect?api_type=room_list'+perm
        )
        .subscribe({
          next: (response) => {
            if (response.code === 3000 && response.result.status === 'success') {
              const json = response.result.data;
              const jsonArray = Object.keys(json).map(key => {
                return {
                  id: key,
                  ...json[key]
                };
              });
              this.roomCards = this.mapRoomData(jsonArray, this.roomIds);
            } else {
              this.showErrorAlert(
                'Failed to fetch room list. Please try again later.'
              );
            }
            this.loadingRooms = false;
          },
          error: (err) => {
            console.error('Error:', err);
            this.showErrorAlert(
              'An error occurred while fetching room list. Please try again later.'
            );
          },
      });
      setTimeout(() => {
        this.loadingRooms = false;
      }, 2000);
    }
  }
 
  removeRoom(room: any, roomId: any) {    
    this.roomIds = this.roomIds.filter(room => room.id !== roomId);
    if (this.roomIds.length < 1) this.showBookingSummary = false;
    room.is_button_disabled = false;
    this.authService.setBookingRooms(this.roomIds);
    let rm = this.roomCards.find(rm => rm.id === roomId);
    if (rm) rm.is_button_disabled = false;
  }
  checkIfNaN(value: any): boolean {
    return isNaN(value);
  }
  checkExtraGuest(room: any, roomId: any, inputbox: HTMLInputElement) {
    let rm = this.roomCards.find(rm => rm.id === roomId);
    if(this.checkIfNaN(inputbox.value)) {
      if(inputbox.checked) {
        if (rm) rm.noof_guest = 1;
        room.noof_guest = 1;
      } else {
        if (rm) rm.noof_guest = 0;
        room.noof_guest = 0;
      }
    } else {
      room.noof_guest = inputbox.value;
      if (rm) rm.noof_guest = inputbox.value;
    }
    this.authService.setBookingRooms(this.roomIds);
  }
  mapRoomData(data: any[], roomIds: any[]): Room[] {
    return data.map((room) => ({
      id: room.id || 'Unknown',
      week_day_bed_charge: room.week_day_bed_charge || 0,
      cottage_type: room.cottage_type || 'Unknown',
      max_guest: room.max_guest || 0,
      week_day_rate: room.week_day_rate || 'Unknown',
      week_end_bed_charge: room.week_end_bed_charge || 'Unknown',
      week_end_rate: room.week_end_rate || 'Unknown',
      name: room.name || 'Unknown',
      resort: room.resort || 'Unknown',
      max_adult: room.max_adult || 3,
      // max_child: room.max_child || 0,
      noof_adult: room.max_adult,
      // noof_child: room.max_child,
      noof_guest: 0,
      week_day_guest_charge: room.week_day_guest_charge || 'Unknown',
      week_end_guest_charge: room.week_end_guest_charge || 'Unknown',
      is_button_disabled: this.toggleButtonDisabledById(room.id, roomIds),
      image: room.image || 'assets/img/bonnet/BONNET-OUTER-VIEW.jpg', // set a default image if it is not available
    }));
  }
  toggleButtonDisabledById(room_id: number, roomIds: any[]): any {
    for (const roomId of roomIds) {
      if (roomId.id === room_id) return true;
    }
    return false;
  }
  showErrorAlert(msg = '') {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }

  addRoom(room: any) {
    let foundRoom = this.roomIds.find(singRoom => singRoom.id === room.id);
    if (!foundRoom) { this.roomIds.push(room); }
    this.showBookingSummary = true;
    room.is_button_disabled = true;
    this.authService.setBookingRooms(this.roomIds);
    // if(this.selectedResort != '' && this.checkinDate != null && this.checkoutDate != null) {
    // } else alert('please fill search fields');
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const roomId of this.roomIds) {
      if (roomId) {
        totalPrice += roomId.week_day_rate+(roomId.noof_guest*roomId.week_day_bed_charge);
      }
    }
    return totalPrice;
  }
  calculateTotalGst(): number {
    let totalPrice = 0;
    for (const roomId of this.roomIds) {
      if (roomId) {
        totalPrice += roomId.week_day_rate+(roomId.noof_guest*roomId.week_day_bed_charge);
      }
    }
    totalPrice = ((totalPrice*12)/100);
    return totalPrice;
  }
  calculatePayablePrice(): number {
    const totalPrice = this.calculateTotalPrice();
    const gstPercentage = 0.12; // GST @12%
    const gstAmount = totalPrice * gstPercentage;
    const payablePrice = totalPrice + gstAmount;
    return payablePrice;
  }
  goToBooking() {
    this.router.navigate(['/booking-summary']);
  }
  trackByRoomCard(index: number, card: any): string {
    return card.roomName;
  }
}
