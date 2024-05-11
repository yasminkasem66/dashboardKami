/* eslint-disable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfPostsComponent } from './list-of-posts.component';
import { PostsService } from '../../services/posts.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SlicePipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { IPost } from '../../models/ipost';

describe('ListOfPostsComponent', () => {
  let component: ListOfPostsComponent;
  let fixture: ComponentFixture<ListOfPostsComponent>;
  let postsService: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfPostsComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [SlicePipe, PostsService, provideHttpClientTesting()],
    }).compileComponents();
    postsService = TestBed.inject(PostsService);
    // httpMock = TestBed.inject(HttpTestingController);
    // fixture = TestBed.createComponent(ListOfPostsComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on initialization', () => {
    expect(component.posts.length).toBe(0);
  });

  it('should fetch posts correctly', () => {
    const testData: IPost[] = [
      { id: '1', title: 'Test Post 1', body: 'Test Post 1' },
      { id: '2', title: 'Test Post 2', body: 'Test Post 2' },
    ];

    spyOn(postsService, 'getListOfPosts').and.returnValue(of(testData));

    component.getPosts();

    expect(component.data).toEqual(testData);
    expect(component.posts).toEqual(testData);
  });
});
