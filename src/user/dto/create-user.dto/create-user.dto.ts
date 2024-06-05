import { IsEmail ,IsNotEmpty  , Matches  } from "class-validator";
export class CreateUserDto {
   @IsNotEmpty()
   @Matches(/^[a-z]+[0-9]+$/ ,{
     message: 'username must be valid',
   })
   username : string;


    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
        message: 'email must be lowercase',
      })
    email : string;
   
   
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]+$/ , {
      message: 'name must be valid',
    })
    
    name : string;

    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]{3,30}$/ ,{
      message: 'password must be valid',
    })
    password : string;
}

