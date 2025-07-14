import express from 'express'
import { documentSchema, docValidator } from '../validators/document.validate';
import { createdocument, getDocuments } from '../handling/dochandling';
import { userAuthorization } from '../middleware/authorization';
const docRouter =express.Router()


docRouter.post("/" , docValidator(documentSchema) , userAuthorization , createdocument )
docRouter.get("/" , userAuthorization , getDocuments)


export default docRouter;