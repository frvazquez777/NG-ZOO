//import { trigger, AnimationTriggerMetadata, state, style, transition, animate } from '@angular/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';

export const fundido =
    trigger('componentAnimation', [
     /*   state('*', style({
            opacity: 1
        })),*/
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateY(-33%)'
            }),
            animate('1s', style({
                opacity: 1,
                transform: 'translateY(0)'

            }))
        ])
      /*  transition(':leave', [
            animate('2s', style({
                opacity: 0
            }))
        ])*/
    ]);


export const rotacion =
trigger('rotacion', [
 /*   state('*', style({
        opacity: 1
    })),*/
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'rotate(150deg)'
        }),
        animate('1s', style({
            opacity: 1,
            transform: 'rotate(0deg)'

        }))
    ])
  /*  transition(':leave', [
        animate('2s', style({
            opacity: 0
        }))
    ])*/
]);