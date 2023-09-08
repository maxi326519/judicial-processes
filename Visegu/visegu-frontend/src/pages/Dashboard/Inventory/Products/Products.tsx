import { useDispatch } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";

import Categories from "./Categories/Categories";

import styles from "./Products.module.css";
import { Product } from "../../../../interfaces/Product";
import ProductRow from "./ProductRow/ProductRow";

export default function Products() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState(false);

/*   const { list, page, ...properties } = useProduct(); */

  const [dataView, setDataView] = useState<string>("");

  function handleView(propertyId?: string) {
    setDataView(propertyId || "");
  }

  function handleEdit(data: Product) {
    /*     setDataEdit(data); */
    handleClose();
  }

  function handleClose() {
    setCategories(!categories);
    /*     if (categories) {
          setDataEdit(undefined);
        } */
  }

  function handleSaveProduct(
    property: Product,
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

  function handleDelete(product: Product) {
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
            dispatch<any>(deleteProduct(property))
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
      {categories && <Categories handleClose={handleClose} />}
      <header>
        <div className={styles.controls}>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleClose}
          >
            + New Product
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
            list.data?.map((property: Product) => (
              <ProductRow
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
