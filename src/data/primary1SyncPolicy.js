// Primary 1 progress synchronization policy. Server sync can use this payload later.
export const buildPrimary1SyncPayload=(learnerId,progress)=>({learnerId:String(learnerId),className:'Primary 1',progress:progress||{},updatedAt:new Date().toISOString(),version:1});
export const mergePrimary1Progress=(local={},remote={})=>{const merged={...local};Object.entries(remote||{}).forEach(([k,v])=>{if(!merged[k]||new Date(v?.updatedAt||0)>new Date(merged[k]?.updatedAt||0))merged[k]=v});return merged};
