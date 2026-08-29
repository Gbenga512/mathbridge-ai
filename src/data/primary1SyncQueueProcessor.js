// Primary 1 queued-progress processor. The caller supplies the server sync function.
export const processPrimary1SyncQueue=async(sync,queue=[])=>{const results=[];for(const item of queue){try{await sync(item);results.push({item,status:'synced'})}catch(error){results.push({item,status:'failed',error:String(error?.message||error)})}}return results};
