import {ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {QUANTITIES} from "./Quantities";
import {NativeAudio} from "@capacitor-community/native-audio";
import {AppComponent} from "../app.component";

export interface PhysicalQuantities {
  name: string;
  value: string;
  unit: string;
}

interface PhysicalQuantitiesQuestion extends PhysicalQuantities{
  options: string[];
}

interface QuestionButtons {
  index: number,
  is_correct?: boolean,
  correct_button?: number
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
  animations: [
    trigger('ContentAnimation', [
       state('void', style({opacity: 0, transform: 'translateY(-100%)' })),
       transition(':enter', [
         animate(150, style({opacity: 1, transform: 'translateY(0)' }))
       ]),
    ]),
  ]
})
export class MainPage {
  private readonly MAX_OPTIONS: number = 4;

  private readonly values: PhysicalQuantities[] = QUANTITIES;

  public display_value: PhysicalQuantitiesQuestion | null = null;

  public selected_button: QuestionButtons | null = null;

  constructor(private ngZone: NgZone) {
    this.update_value();
  }

  private update_value(): void {
    this.selected_button = null;

    this.ngZone.run(() => {
      this.display_value = this.get_random_question();
    });
  }

  private get_random_question(): PhysicalQuantitiesQuestion {
    //Getting random value
    const randomQuestionIndex: number = Math.floor(Math.random() * this.values.length);
    const randomPhysicalQuantities: PhysicalQuantities = this.values[randomQuestionIndex];
    const i1: number = Math.floor(Math.random() * 2);

    let next_v: number = i1 ^ 1;
    const question_name: string = Object.values(randomPhysicalQuantities)[i1] as string;
    const question_correct_value: string = Object.values(randomPhysicalQuantities)[next_v] as string;
    const question_unit: string = Object.values(randomPhysicalQuantities)[2] as string;

    let incorrect_options: string[] = [];
    let questionIndexes: number[] = [randomQuestionIndex];

    for (let i = 0; i < this.MAX_OPTIONS - 1; i++) {
      let random_option = this.get_random_option(next_v, questionIndexes);
      questionIndexes.push(random_option.selected_index);
      incorrect_options.push(random_option.value);
    }

    const options_values: string[] = this.shuffle<string>([question_correct_value, ...incorrect_options]);

    return {
      name: question_name,
      value: question_correct_value,
      unit: question_unit,
      options: options_values
    }
  }

  private get_random_option(next_v: number, randomQuestionIndexes: number []): {value: string, selected_index: number} {
    //Getting second value
    let random_index: number;
    do {
      random_index = Math.floor(Math.random() * this.values.length);

      var valueExists: boolean = false;
      for (const index of randomQuestionIndexes) {
        if (Object.values(this.values[random_index])[next_v] as string === Object.values(this.values[index])[next_v] as string) {
          valueExists = true;
          break;
        }
      }
    } while (randomQuestionIndexes.includes(random_index) || valueExists);

    return {value: Object.values(this.values[random_index])[next_v] as string, selected_index: random_index };
  }

  private shuffle<T>(array: T[]): T[] {
    let currentIndex: number = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  public check_answer(index: number): void {
    if(this.display_value && !this.selected_button) {
      this.selected_button = {
        index: index,
        is_correct: this.display_value.options[index] === this.display_value.value,
        correct_button: ((): number | undefined => {
          for (const [index, value] of this.display_value?.options.entries()) {
            if(value === this.display_value?.value) return index
          }
          return undefined
        })()
      }

      if(this.selected_button.is_correct) {
        NativeAudio.play({assetId: AppComponent.SUCCESS_AUDIO_ID});
      } else NativeAudio.play({assetId: AppComponent.ERROR_AUDIO_ID});

      setTimeout(() => {
        this.update_value();
      }, 700);
    }
  }
}
