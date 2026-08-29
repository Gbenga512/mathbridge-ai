// Parent-child linking model for Primary 1 progress access.
export const createParentChildLink=(parentId,childId)=>({parentId:String(parentId),childId:String(childId),className:'Primary 1',linkedAt:new Date().toISOString(),active:true});
export const isValidParentChildLink=(link,parentId,childId)=>Boolean(link?.active&&link.parentId===String(parentId)&&link.childId===String(childId));
