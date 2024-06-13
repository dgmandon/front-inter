export class FormDataUtil {

  private formData: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  append(key: string, value: any, fileName?: string) {
    if (value == null || value === '') {
      this.formData.append(key, '');
      return;
    }

    if (value instanceof File) {
      this.formData.append(key, value, fileName || value.name);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          this.formData.append(`${key}[${index}]`, item, item.name);
        } else {
          this.formData.append(`${key}[${index}]`, item);
        }
      });
      return;
    }

    this.formData.append(key, value);
  }
}
