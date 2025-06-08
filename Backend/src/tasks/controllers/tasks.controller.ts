import { Controller, Get, Param, Post, Body, Put, Delete} from '@nestjs/common';

@Controller('api/tasks')
export class TasksController {
    
    @Get()
    getAll(){
        return [1,2,3];
    }

    @Get(':id')
    getOne(@Param('id') id: number){
        return id;
    }

    @Post()
    create(@Body() body: any){
        return body;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any){
        return body
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return true;
    }
}
