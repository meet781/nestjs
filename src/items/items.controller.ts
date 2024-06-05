import { Controller  , Get , Post  ,Put , Delete , Body , Param} from '@nestjs/common';
import { Item } from '../item.interface';
import { items} from 'src/data';
import { ResponseService } from 'src/helper/response.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly responseService : ResponseService) {}
    @Get()
    findAll(): any {
        return this.responseService.send(items, 'OK' ,'All items retrieved');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
       const item = items.find(item => item.id === +id);
       if(!item) {
        return this.responseService.send('No such item found' , "NOT_FOUND");
       }
       return this.responseService.send(item, 'OK' ,'Item retrieved');
    }

    @Post()
    create(@Body() item: Item): Item {
        items.push(item)
        this.responseService.send(item, 'OK' ,'Item created');
        return item
      }

    
    @Put(':id')
    update(@Param('id') id: string, @Body() updatedItem: Item):any{
    const index = items.findIndex(item => item.id === +id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      return this.responseService.send(items[index], 'OK' ,'Item updated');
    } else {
      return this.responseService.send('Item not found', 'NOT_FOUND');
    }
}

}
