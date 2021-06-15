import { AfterViewInit, Directive, Inject, Renderer2 } from '@angular/core';
import { AngularEditorService } from '@kolkov/angular-editor';
import { API_BASE_URL } from '@shared/api/base-url';
import { OVERIGHT_EDITOR, ICON_SELECT } from './fix-font-editor.constan';

@Directive({
  selector: 'angular-editor',
  providers: [AngularEditorService]
})
export class FixFontEditorDirective implements AfterViewInit {

  customFonts = ['Arial', 'Times New Roman', 'Calibri', 'Comic Sans MS'];
  private _selectFontString = OVERIGHT_EDITOR;
  private _iconSelect = ICON_SELECT;
  private _buttonLabel: HTMLElement;
  constructor(
    @Inject(API_BASE_URL) protected hostUrl: string,
    private _angularEditorService: AngularEditorService,
    private _renderer2: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this._fixFontEditor();
  }

  private _fixFontEditor(): void {
    const selectFont = document.querySelectorAll('.select-font');
    const electFontPanel = selectFont[0].querySelectorAll('.ae-picker-options');
    const elementInsert = this._createElement(this._selectFontString);
    electFontPanel[0].parentNode.appendChild(elementInsert);
    electFontPanel[0].remove();
    // if (!this._buttonLabel) {
    //   const selectFontElement = document.querySelectorAll('.select-font');
    //   this._buttonLabel = selectFontElement[0].querySelectorAll('.ae-picker-label')[0] as HTMLElement;
    // }
    // console.log(this._buttonLabel.innerHTML)
    const newSelectFont = document.querySelectorAll('.custom-font');
    // this._setColorFontSelected("Times New Roman", newSelectFont)
    const buttonLength = newSelectFont.length;
    for (let i = 0; i < buttonLength; i++) {
      newSelectFont[i].addEventListener('click', () => {
        for (let j = 0; j < buttonLength; j++) {
          this._renderer2.removeClass(newSelectFont[j], 'selected');
          this._renderer2.removeClass(newSelectFont[j], 'focused');
        }
        this._renderer2.addClass(newSelectFont[i], 'selected');
        this._renderer2.addClass(newSelectFont[i], 'focused');
        this._renderer2.removeClass(
          newSelectFont[i].parentNode.parentElement,
          'ae-expanded'
        );
        const colorString = newSelectFont[i].textContent.trim();
        this._angularEditorService.setFontName(
          colorString
        );
        const buttonLabel =
          newSelectFont[i].parentElement.previousElementSibling;
        buttonLabel.innerHTML = colorString;
        this._renderer2.appendChild(buttonLabel, this._createElement(this._iconSelect));
        buttonLabel.addEventListener('click', () => {
          this._renderer2.addClass(
            newSelectFont[i].parentNode.parentElement,
            'ae-expanded'
          );
          this._setColorFontSelected(colorString, newSelectFont);
        });
      });
    }
  }

  private _createElement(htmlString: string): HTMLElement {
    const divElement = document.createElement('div');
    divElement.innerHTML = htmlString;
    return divElement.firstChild as HTMLElement;
  }

  private _setColorFontSelected(colorString: string, buttonColorArray: NodeListOf<Element>): void {
    const length = buttonColorArray.length;
    for (let i = 0; i < length; i++) {
      this._renderer2.removeClass(buttonColorArray[i], 'selected');
      this._renderer2.removeClass(buttonColorArray[i], 'focused');
      if ((buttonColorArray[i] as HTMLElement).innerText.trim() === colorString) {
        this._renderer2.addClass(buttonColorArray[i], 'selected');
        this._renderer2.addClass(buttonColorArray[i], 'focused');
      }
    }
  }

  clickEditor(): void {
    const selectNode = this._angularEditorService.getSelectedNodes();
    if (selectNode && selectNode.length && selectNode[2].face && selectNode[2].face !== "") {
      if (!this._buttonLabel) {
        const selectFontElement = document.querySelectorAll('.select-font');
        this._buttonLabel = selectFontElement[0].querySelectorAll('.ae-picker-label')[0] as HTMLElement;
      }
      this._buttonLabel.innerHTML = selectNode[2].face;
      this._renderer2.appendChild(this._buttonLabel, this._createElement(this._iconSelect));
    }
  }

}
