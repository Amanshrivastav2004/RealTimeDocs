import express from 'express'
import { documentSchema, docValidator } from '../validators/document.validate';
import { allDocuments, createdocument, deleteDocument, searchDocument} from '../handling/dochandling';
import { userAuthorization } from '../middleware/authorization';
const docRouter =express.Router()


docRouter.post("/" ,  userAuthorization , createdocument )
docRouter.get("/" , userAuthorization , allDocuments)
docRouter.get("/search" , userAuthorization , searchDocument)
docRouter.delete("/delete/:docId" , userAuthorization , deleteDocument)



export default docRouter;