import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MainTopic} from "../classes/MainTopic";
import {Source} from "../classes/Source";
import {Fact} from "../classes/Fact";
import {Comment, FactResume, IUser, MainResume, Resume} from "../../shared/interfaces";

//  Сервис для взаимодействия фронта с серверной частью
@Injectable({
  providedIn: 'root'
})
export class DebunkerServise {

  constructor(private http: HttpClient) {
  }

  //  Методы для проверки работоспособности сервера
  checkDebunkerServise(): Observable<any> {
    return this.http.get<any>('/api/health');
  }

  //  Методы для получения различных данных с сервера
  getTopicById(mainTopicId: string): Observable<MainTopic> {
    return this.http.get<MainTopic>(`/api/news/${mainTopicId}`);
  }
  getFactById(factId: string): Observable<Fact> {
    return this.http.get<Fact>(`/api/news/${factId}`);
  }
  getAllNews(): Observable<MainTopic[]> {
    return this.http.get<MainTopic[]>('/api/news');
  }
  getAllSources(): Observable<Source[]> {
    return this.http.get<Source[]>('/api/sources');
  }
  getFactsByMainTopicId(mainTopicId: string): Observable<any> {
    return this.http.get<Fact[]>(`/api/news/${mainTopicId}`)
  }
  getCommentsByFactId(factId: string): Observable<any> {
    return this.http.get<any>(`/api/facts/${factId}`);
  }
  getMTDecisions(id: number): Observable<Resume>  {
  return this.http.get<Resume>(`/api/maintopic-resumes/${id}`)
  }
  getFDecisions(id: number): Observable<Resume>  {
    return this.http.get<Resume>(`/api/fact-resumes/${id}`)
  }
  // метод получения id Пользователя
  getUserById(): Observable<IUser>  {
    // более корректно доделать,когда будет функционал
    let email="admin@debunker.local";
    return this.http.post<IUser>(`/api/get-user-id/`,{email:email})
  }

  //todo забирать проанализованные картинки(доделать,когда доделают бэк)
  getImgs(): Observable<any>  {
    return this.http.get<Resume>(`/api/picture/`)
  }

  // Метод создания новости
  createMainTopic(userId: any, name: any, text: any, url: any, source: any, images_list?: any): Observable<MainTopic> {
    const body = {name: name, text: text, url: url, source: source, user: userId,  images_list: images_list};
    return this.http.post<MainTopic>('/api/news/', body)
  }

  // Метод создания  комментария
  createComment(factId: string, userId: any, text: any): Observable<Comment> {
    const body = {fact_id: factId, user: userId, text: text};
    return this.http.post<Comment>(`/api/comments/`, body)
  }

  // Метод изменения статуса
  updateStatus(model: number, object: number, status: any) {
    const body = {model: Number(model), object: object, status: status};
    return this.http.post<Comment>(`/api/change-status/`, body)
  }

  // Методы сохранения решения
  saveMaintopicResumes(id: number, userId: any, text: string): Observable<Resume> {
    const body = {main_topic_id: id, user: userId, text: text, main_topic_name:text};
    return this.http.post<MainResume>(`/api/maintopic-resumes/`, body)
  }
  saveFactResumes(id: number, userId: any, text: string) {
    const body = {fact_id: id, user: userId, text: text, fact_name:text};
    return this.http.post<FactResume>(`/api/fact-resumes/`, body)
  }
  savePictureResumes(id: number, userId: any, text: string) {
    const body = {id: id, user: userId, text: text};
    return this.http.post<Resume>(`/api/picture-resumes/`, body)
  }

}
