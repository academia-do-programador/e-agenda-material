import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellModule } from './shell/shell.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { NotificationModule } from './notification/notification.module';
import { NotFoundModule } from './not-found/not-found.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    CoreModule,
    AuthModule,
    ShellModule,
    NotFoundModule,
    NotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
