import React from "react";
import { Modal } from "antd";
import ModalTitle from "../../components/ModalTitle";
import ColorIcon from "../../components/ColorIcon";

const data = {
  name: "Basic Knit Sweater",
  description:
    "Round neck sweater featuring long sleeves, side vents at the hem and ribbed trims.",
  category: "Sweater",
  price: "25.58",
  colors: [
    "#000000",
    "#95D5EA",
    "#60AB4DBD",
    "#EDD3ABD6",
    "#F81515C9",
    "#D9D9D9",
  ],
  sizeAndAmount: "150-Black-S, 100-Black-M ",
  images: [
    "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  ],
};

const ProductDetailModal = ({ open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text={"Product Detail"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={1000}
      footer={null}
    >
      <table className="table-auto modal-table">
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{data.name}</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{data.description}</td>
          </tr>
          <tr>
            <th>Category:</th>
            <td>{data.category}</td>
          </tr>
          <tr>
            <th>Price:</th>
            <td>{"$" + data.price}</td>
          </tr>
          <tr>
            <th>Color:</th>
            <td className="row gap-x-10">
              {data.colors.map((c, i) => (
                <ColorIcon key={i} color={c}/>
              ))}
            </td>
          </tr>
          <tr>
            <th>Size & Amount:</th>
            <td>{data.sizeAndAmount}</td>
          </tr>
          <tr>
            <th>Images:</th>
            <td className="flex overflow-x-auto pb-2 gap-x-3">
              {data.images.map((image, i) => (
                <img key={i} src={image} alt="Product" className="w-[100px] h-[150px] object-cover object-center flex-none"/>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default ProductDetailModal;
