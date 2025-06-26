import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Section } from '../../utils/classes/sections/Section';

@Component({
  selector: 'app-section-display',
  imports: [],
  templateUrl: './section-display.component.html',
  styleUrl: './section-display.component.css'
})
export class SectionDisplayComponent implements OnInit {
  @ViewChild('classDiv', { static: true }) mainContentRef!: ElementRef;

  @Input() displayedSection!: Section<any, any> ;
  @Input() editable: boolean = false

  constructor() {};

  ngOnInit()
  {
    const mainElement = this.mainContentRef.nativeElement as HTMLDivElement;

    let baseHtml = this.editable?this.displayedSection.editableHtmlElement:this.displayedSection.htmlElement;
    mainElement.appendChild(baseHtml);

    this.displayedSection.addEventListener("modified", (event: any) => {
      if (event.detail.requires_reload) {
        const newEl = this.editable?this.displayedSection.editableHtmlElement:this.displayedSection.htmlElement;
        mainElement.replaceChild(newEl, baseHtml);

        baseHtml = newEl;
      }
    });

  }

}
