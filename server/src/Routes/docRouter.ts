import express from 'express'
import { documentSchema, docValidator } from '../validators/document.validate';
import { allDocuments, createdocument} from '../handling/dochandling';
import { userAuthorization } from '../middleware/authorization';
const docRouter =express.Router()


docRouter.post("/" , docValidator(documentSchema) , userAuthorization , createdocument )
docRouter.get("/" , userAuthorization , allDocuments)


export default docRouter;