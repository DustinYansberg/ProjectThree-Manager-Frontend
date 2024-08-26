import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent, CodeSnippetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
      },
    ]),
  ],
})
export class ProfileModule {}
