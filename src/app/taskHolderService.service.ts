import { Injectable } from '@angular/core';

interface task {
    id: number,
    task:string
}

@Injectable()

export class TaskHolderService {
    
    tasks = ['Complete next section of Javascript: The Hard Parts','2','3','1','2','3','1','2','3',]
    
    

}