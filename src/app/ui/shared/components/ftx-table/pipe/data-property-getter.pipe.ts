import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: unknown[]): unknown {
    const propertyParts = keyName.split('.');

    let currentValue = object;
    for (const part of propertyParts) {
      if (currentValue && currentValue.hasOwnProperty(part)) {
        currentValue = currentValue[part];
      } else {
        return undefined;
      }
    }

    return currentValue;
  }

}
