import { paths } from "../../../constants/paths";
import { catalogConfigs } from "../../Catalog/Registry/catalogConfigs";

export const logSelectByCatalogName =(catalogName)=>{

  let logObject
  if (catalogName==='controlPoints') {
    logObject={
      unique: 'контрольных точек',
      creationGroup:'CONTROL_POINTS_GROUP_CREATION_SUCCESS',
      editionGroup:'CONTROL_POINTS_GROUP_EDITION_SUCCESS',
      creation:'CONTROL_POINTS_CREATION_SUCCESS',
      edition:'CONTROL_POINTS_EDITION_SUCCESS'
    }
  } else if (catalogName==='techMaps'){
    logObject={
      unique: 'технологических карт',
      creationGroup:'TECH_MAPS_GROUP_CREATION_SUCCESS',
      editionGroup:'TECH_MAPS_GROUP_EDITION_SUCCESS',
      creation:'TECH_MAPS_CREATION_SUCCESS',
      edition:'TECH_MAPS_EDITION_SUCCESS'
    }
  }else {
    logObject = catalogConfigs(paths).find((el) => el.name === catalogName  );

  }
  return logObject
}
