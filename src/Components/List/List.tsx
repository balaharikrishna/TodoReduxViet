import './List.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ICommonTypes from '../CommonTypes/CommonTypes';

 interface IListObj {
  show : boolean,
  changeShowState: (show : boolean) => void, 
  getEditListId: (id:number) => void,
  getListId :(id:number)=>void,
  changeShowDelete :(id:number)=>void,
  clearAllFields: () => void, 
  updatedActiveListId :number | undefined,
  }

const List = ({show,changeShowState,getEditListId,getListId,changeShowDelete,clearAllFields,updatedActiveListId} : IListObj) => {
  const localData:any = useSelector<ICommonTypes>(state => state.localData);
  const [activeList,setActiveList] = useState<number>(localData ? localData[0]?.id : "");

  useEffect(()=>{
    if(activeList==undefined || activeList == null || activeList==0){
      setActiveList(localData ? localData[0]?.id : "")
    }
  })
  
  
useEffect(()=>{
  setActiveList(localData ? localData[0]?.id : "");
},[updatedActiveListId])

 const deleteList = (id:number) =>{
  changeShowDelete(id);
  }

 const editList = (id:number) =>{
  changeShowState(!show);
  getEditListId(id);
 }

 const displayTasks = (id:number) =>{
    getListId(id && id>0 ? id : 0);
  setActiveList(id);
 }

  return (
    <div className="listMainDiv">
      {localData ? (
        <div>
          {localData.map((x: { id: number; listName: string }) => {
            return (
              <div
                className="card listCard"
                style={{
                  backgroundColor: x.id == activeList ? "lightgreen" : "white",
                }}
                onClick={() => displayTasks(x.id)}
              >
                <div className="card-body listCardBody">
                  <div className="row">
                    <div className="col-8 col-sm-8 col-md-9 col-lg-8 col-xl-8 col-xxl-8">
                      <p className="card-title">{x.listName}</p>
                    </div>
                    <div className="col-4 col-sm-4 col-md-3 col-lg-4 col-xl-4 col-xxl-4">
                      <div className="row">
                        <div className="col-6">
                          <i
                            className="fa fa-pencil editOption"
                            onClick={() => editList(x.id)}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-6">
                          <i
                            className="fa fa-trash deleteOption"
                            aria-hidden="true"
                            onClick={() => deleteList(x.id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="col-12">
              <div className="col-12 alert noListsAvailable" role="alert">
                Please Add Lists.
              </div>
            </div>
            <div className="col-12 text-center">
              <button
                type="button"
                className="btn btn-primary addListButtonWithNoLists"
                onClick={clearAllFields}
              >
                <i className="fa fa-plus" aria-hidden="true">
                  &nbsp;Add List
                </i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;