import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../nooble/api-objs/Role';

@Pipe({
  name: 'roleTranscriber'
})
export class RoleTranscriberPipe implements PipeTransform {

  transform(value: Role | undefined, ...args: any[]): string {
    switch (value)
    {
      case Role.ADMIN:
        return "administrateur";

      case Role.STUDENT:
        return "étudiant";
      
      case Role.TEACHER:
        return "enseignant";

      case Role.TEACHER_ADMIN:
        return "enseignant administrateur";

      default:
        return "inconnu au bataillon";
    }
  }

}
