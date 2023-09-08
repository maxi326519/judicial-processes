import { useDispatch } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";


import styles from "./Movements.module.css";
import MovementsRow from "./MovementsRow/MovementsRow";
import { History } from "../../../interfaces/History";

export default function Movements() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState(false);

/*   const { list, page, ...properties } = useMovements(); */

  const [dataView, setDataView] = useState<string>("");

  function handleView(propertyId?: string) {
    setDataView(propertyId || "");
  }

  function handleEdit(data: History) {
    /*     setDataEdit(data); */
    handleClose();
  }

  function handleClose() {
    setCategories(!categories);
    /*     if (categories) {
          setDataEdit(undefined);
        } */
  }

  function handleSaveMovements(
    property: History,
    imagestoUpload: File[],
    imagesToRemove: string[],
    edit: boolean
  ) {
    /*     dispatch(openLoading());
        (edit
          ? properties.update(property, imagestoUpload, imagesToRemove)
          : properties.add(property, imagestoUpload)
        )
          .then(() => {
            dispatch(closeLoading());
            handleClose();
            swal("Guardado", "Se guardo el property correctamente", "success");
          })
          .catch((err: any) => {
            dispatch(closeLoading());
            swal("Error", "No se pudo guardar el property", "error");
            console.log(err);
          }); */
  }

  function handleDelete(product: History) {
    /*     swal({
          text: "¿Seguro desea eliminar este property?",
          icon: "warning",
          buttons: {
            Si: true,
            No: true,
          },
        }).then((response: any) => {
          if (response === "Si") {
            dispatch(openLoading());
            dispatch<any>(deleteMovements(property))
              .then(() => {
                dispatch(closeLoading());
                swal(
                  "Eliminado",
                  "Se elimino el property correctamente",
                  "success"
                );
              })
              .catch((err: any) => {
                dispatch(closeLoading());
                swal("Error", "No se pudo eliminar el property", "error");
                console.log(err);
              });
          }
        }); */
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      <header>
        <div className={styles.controls}>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleClose}
          >
            + New Movements
          </button>
        </div>
      </header>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.firstRow}`}>
          <span>Sku Number</span>
          <span>Item</span>
          <span>Category</span>
          <span>Actions</span>
        </div>
{/*         <div className={styles.body}>
          {list.data.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No hay propiedades</th>
            </tr>
          ) : (
            list.data?.map((property: Movements) => (
              <MovementsRow
                product={property}
                handleEdit={handleEdit}
                handleView={handleView}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
        <div className={styles.pagination}>
          <span>{list.totals} Propiedades</span>
          <button
            disabled={page.current <= 1}
            type="button"
            onClick={() => { console.log("Button prev page"); page.prevPage() }}
          >{`<`}</button>
          <span>{`${page.current} de ${page.totals}`}</span>
          <button
            disabled={page.current >= page.length}
            type="button"
            onClick={() => { console.log("Button next page"); page.nextPage() }}
          >{`>`}</button>
        </div> */}
      </div>
    </div>
  );
}
