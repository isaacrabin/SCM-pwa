import { NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  imports: [IonicModule, RouterModule, NgFor, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingComponent implements OnInit {

  slides: Array<{ title: string, subtitle: string, icon?: string }> = [
    {
      title: 'Welcome to JVApp',
      subtitle: "We're thrilled to have you join us on this journey of streamlined logistics and enhanced efficiency.At JVApp, we understand the critical role that a well- managed supply chain plays in the success of your business.Our mission is to empower you with cutting - edge technology and expert solutions that will elevate your supply chain to new heights.",
    },
    {
      title: 'Seamless Integration',
      subtitle: "Seamlessly integrate every aspect of your supply chain – from procurement to distribution – all in one place. Our user-friendly interface ensures that you're always in control, making informed decisions at every step.",
      icon: 'link'
    },
    {
      title: 'Shop with Ease,Anywhere!',
      subtitle: 'With just a few tops,you can browse and purchase goods from a wide range of suppliers.',
      icon: 'engineering'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
