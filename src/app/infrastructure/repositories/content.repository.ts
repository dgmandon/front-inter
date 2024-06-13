import { concatMap, map, Observable } from "rxjs";
import { HttpService } from "../http/http.service";
import { Injectable } from "@angular/core";
import { ContenService } from "@core/services/content-service.interface";
import { CreateContent } from "@core/models/contents/create-content.model";
import { environment, resources } from "@env/environment";
import { ContentPaginated } from "@core/models/contents/contents-paginated.model";
import { Options } from "./../http/http-options.model";
import { HttpHeaders } from "@angular/common/http";
import { FormDataUtil } from "@infrastructure/utils/form-data";

import { Content } from "src/app/ui/contents/components/content";
@Injectable({
  providedIn: "root",
})
export class ContentRepository extends ContenService {
  baseUrl = `${environment.contentAppUrl}${environment.apiSuffix}${resources.content}`;

  constructor(protected httpService: HttpService) {
    super();
  }
  public override getAllContent(): Observable<Content[]> {
    return this.httpService.doGet<Content[]>(this.baseUrl);
  }
  public createContent(content: CreateContent): Observable<void> {
    return this.postCreateContentId().pipe(
      concatMap((contentId) => this.putCreateContent(contentId, content))
    );
  }

  private postCreateContentId(): Observable<string> {
    return this.httpService
      .doPost<null, { contentId: string }>(this.baseUrl, null)
      .pipe(map((result) => result.contentId));
  }

  public getAllContentPaginated(
    pageNumber: number,
    pageSize: number,
    filter: string = ""
  ): Observable<ContentPaginated> {
    return this.httpService.doGet<ContentPaginated>(
      this.baseUrl +
        "/paginated" +
        `?pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}`
    );
  }

  public override putCreateContent(
    contentId: string,
    content: CreateContent
  ): Observable<void> {
    console.log(content);

    const formData = new FormData();

    if (content.tag) {
      formData.append("tag", content.tag);
    } else {
      formData.append("tag", "");
    }

    if (content.logo) {
      formData.append("logo", content.logo, content.logo.name);
    } else {
      formData.append("logo", "");
    }

    if (content.carousel) {
      content.carousel.forEach((file) => {
        formData.append("carousel", file, file.name);
      });
    } else {
      formData.append("carousel", "");
    }

    if (content.styles) {
      formData.append(
        "styles.backgroundColor",
        content.styles["background-color"]
      );
      formData.append("styles.color", content.styles["color"]);
    } else {
    }

    if (content.languages) {
      content.languages.forEach((element, index) => {
        //formData.append(languages[${index}], element);
        formData.append("languages", element);
      });
    } else {
      formData.append("languages", "");
    }

    if (content.contents[0].details.length > 0) {
      content.contents.forEach((content, index) => {
        formData.append(
          `contents[${index}].languageIndex`,
          content.languageIndex.toString()
        );
        formData.append(`contents[${index}].title`, content.title);
        content.details.forEach((element, indexdt) => {
          formData.append(
            `contents[${index}].details[${indexdt}].index`,
            element.index.toString()
          );
          formData.append(
            `contents[${index}].details[${indexdt}].behavior`,
            element.behavior
          );
          formData.append(
            `contents[${index}].details[${indexdt}].label`,
            element.label
          );
          formData.append(
            `contents[${index}].details[${indexdt}].data`,
            element.data
          );
        });
      });
    } else {
      formData.append("contents", "");
    }

    const headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "multipart/form-data",
    });
    const options = new Options();
    options.headers = headers;
    options.params = formData;

    return this.httpService.doPutFormData<FormData, void>(
      `${this.baseUrl}/${contentId}`,
      formData
    );
  }

  private mapDataToFormData(content: CreateContent): FormData {
    const formData = new FormData();
    const formDataUtil: FormDataUtil = new FormDataUtil(formData);
    formDataUtil.append("tag", content.tag);
    formDataUtil.append("logo", content.logo);
    formDataUtil.append("carousel", content.carousel);
    formDataUtil.append(
      "styles.backgroundColor",
      content.styles?.["background-color"]
    );
    formDataUtil.append("styles.color", content.styles?.color);
    formDataUtil.append("languages", content.languages);

    if (content.contents && content.contents[0]?.details.length > 0) {
      content.contents.forEach((contentItem, index) => {
        formDataUtil.append(
          `contents[${index}].languageIndex`,
          contentItem.languageIndex.toString()
        );
        formDataUtil.append(`contents[${index}].title`, contentItem.title);
        contentItem.details.forEach((detail, detailIndex) => {
          formDataUtil.append(
            `contents[${index}].details[${detailIndex}].index`,
            detail.index.toString()
          );
          formDataUtil.append(
            `contents[${index}].details[${detailIndex}].behavior`,
            detail.behavior
          );
          formDataUtil.append(
            `contents[${index}].details[${detailIndex}].label`,
            detail.label
          );
          formDataUtil.append(
            `contents[${index}].details[${detailIndex}].data`,
            detail.data
          );
        });
      });
    } else {
      formDataUtil.append("contents", "");
    }

    return formData;
  }

  public override deleteContent(id: string): Observable<void> {
    return this.httpService.doDelete(`${this.baseUrl}/${id}`);
  }
}
