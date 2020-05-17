import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import { Ng2SearchPipeModule } from 'ng2-search-filter'

//PrimeNG
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { ListboxModule } from 'primeng/listbox';
import {InputTextModule} from 'primeng/inputtext';
import {FieldsetModule} from 'primeng/fieldset';


//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserProfileComponent } from './user-profile/user-profile.component';

//httpclient
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { CRUDComponent } from './crud/crud.component';
import { httpInterceptProviders } from './services/http-interceptor';


const config = {
  apiKey: "AIzaSyCyE7u2DONc1J56pn4WdYUTi8rbZ4taExI",
  authDomain: "cloudapis-eindproject.firebaseapp.com",
  databaseURL: "https://cloudapis-eindproject.firebaseio.com",
  projectId: "cloudapis-eindproject",
  storageBucket: "cloudapis-eindproject.appspot.com",
  messagingSenderId: "891807008280",
  appId: "1:891807008280:web:f4411ee4fac75fac6aa56d",
  measurementId: "G-N94MHZ1R5L"
};

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HomepageComponent,
    NavigationComponent,
    CRUDComponent
  ],
  imports: [
    MenuModule,
    ButtonModule,
    BrowserAnimationsModule,
    TabMenuModule,
    ListboxModule,
    InputTextModule,
    FieldsetModule,

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "login", component: UserProfileComponent },
      { path: "home", component: HomepageComponent },
      { path: "crud", component: CRUDComponent },
      { path: "", component: HomepageComponent }
    ])
  ],
  providers: [httpInterceptProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }



// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/7.14.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/7.14.2/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>