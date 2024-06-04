import { Injectable } from "@nestjs/common"
import { codes } from "./responsecode"

@Injectable()
/**
 * Resonse Service Class  for  Generating Response
 */

export class ResponseService {
    // method for generate Success response
    send(data: any, message: string, code: string = 'OK') {
        const [status, statusText] = this.getCode(code)
         
        return {
            status,
            statusText,
            data,
            message
        }
    }
   
    //method  for generating Error Message
 

    //method for getting code from responsecode
    getCode(code: string): [number, string] {
        if (codes[code]) {
            return codes[code];
        } else {
            return [500, 'Internal Server Error'];
        }
    }

}