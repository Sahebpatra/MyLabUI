import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
  Bold,
  Italic,
  Underline,
  Essentials,
  Paragraph,
  Undo,
  List,
  Table,
  TableToolbar,
  Heading,
  Link,
  AutoLink,
  EditorConfig,
} from 'ckeditor5';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-rich-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CKEditorModule],
  templateUrl: './rich-text.component.html',
  styles: `
    ::ng-deep .ck-editor__editable_inline {
      min-height: 300px;
    }
    ::ng-deep .ck-editor__top {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `,
})
export class RichTextComponent {
  @Input({ required: true }) control!: FormControl;
  @ViewChild('modalElement') modalElement!: ElementRef;
  private modalInstance: any;

  public Editor = ClassicEditor;
  public config: EditorConfig = {
    licenseKey: 'GPL',
    plugins: [
      Essentials,
      Paragraph,
      Undo,
      Bold,
      Italic,
      Underline,
      List,
      Table,
      TableToolbar,
      Heading,
      Link,
      AutoLink,
    ],
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'insertTable',
      ],
      shouldNotGroupWhenFull: true, // Keeps toolbar responsive
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
      ],
    },
    placeholder: 'Enter guidelines here...',
  };
 ngAfterViewInit() {
    // Listen for Bootstrap's 'hide' event
    this.modalElement.nativeElement.addEventListener('hide.bs.modal', () => {
      // Remove focus from whatever is currently focused (like the close button)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }


show() {
  // Initialize only if it doesn't exist
  if (!this.modalInstance) {
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement, {
      focus: false,
      backdrop: 'static'
    });
  }
  this.modalInstance.show();
}

close() {
  // Use the stored instance to hide
  this.modalInstance?.hide();
}
  
}
