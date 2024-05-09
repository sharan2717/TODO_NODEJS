
import { Request, Response } from 'express'
import { TodoItem } from "../dtos/todo-items"
import { addDocument, deleteDocument, FetchDocument, UpdateDocument } from "../mongodb/mongodb"

export async function getItems(req: Request, res: Response) {

    try {
        const documents = await FetchDocument();
        res.status(200).json(documents);
    } catch (error: any) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function addItems(req: Request, res: Response) {

    try {
        const todoItem: TodoItem = req.body;
        await addDocument(todoItem)
        res.status(200).json({ message: 'Document Added successfully' });

    } catch (error: any) {
        res.status(500).json({ error: error.message });

    }

}

export async function updateItem(req: Request, res: Response) {

    try {
        const todoItem: TodoItem = req.body;
        let id: any = req.query.id;
        await UpdateDocument(id, todoItem)
        res.status(200).json({ message: 'Document Updated successfully' });

    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteItem(req: Request, res: Response) {
    try {
        let id: any = req.query.id;
        await deleteDocument(id)
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error });
    }
}


