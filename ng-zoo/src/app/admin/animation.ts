//import { trigger, AnimationTriggerMetadata, state, style, transition, animate } from '@angular/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeLateral =
  trigger('fadeLateral', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-70%)'
      }),
      animate('1s ease-in', style({
        opacity: 1,
        transform: 'translateX(0)'

      }))
    ])
  ]);

