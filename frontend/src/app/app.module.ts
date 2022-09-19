import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { TestCComponent } from './test-c/test-c.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { HousesModule } from './houses/houses.module';
import { AccountModule } from './account/account.module';
import { AuthInterceptor } from './auth.interceptor';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, HomeComponent, TestCComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AuthModule,
    HousesModule,
    AccountModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.Imagekitio.publicKey,
      urlEndpoint: environment.Imagekitio.urlEndpoint,
      authenticationEndpoint: environment.Imagekitio.authenticationEndpoint,
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
