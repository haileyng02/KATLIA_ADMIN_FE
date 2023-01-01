import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import ModalTitle from "../../components/ModalTitle";
import ColorIcon from "../../components/ColorIcon";
import toTitleCase from '../../utils/toTitleCase'

const ProductDetailModal = ({ open, handleCancel, currentUser, currItem }) => {
  const [detail,setDetail] = useState();

  useEffect(() => {
    if (currItem) {
      getProductDetail(currItem.id);
    }
  }, [currItem]);

  //Get product detail
  const getProductDetail = async (id) => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.GET_PRODUCT_DETAIL(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getProductDetailIdParams(id),
      });
      console.log(result.data);
      setDetail(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  const getSizeAndAmountString = (color,details) => {
    var result='';
    for (let i = 0; i < details.length; i++) {
      result+=details[i].quantity+'-'+toTitleCase(color)+'-'+details[i].size;
      if (i!==details.length-1) {
        result+=', '
      }
    }
    return result;
  }

  return (
    <Modal
      title={<ModalTitle text={"Product Detail"} />}
      open={open}
      onCancel={handleCancel}
      centered
      footer={null}
      width={"50%"}
      className="width-modal"
    >
      <table className="modal-table">
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{detail?.name}</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{detail?.description}</td>
          </tr>
          <tr>
            <th>Category:</th>
            <td>{currItem?.category}</td>
          </tr>
          <tr>
            <th>Price:</th>
            <td>{"$" + detail?.price}</td>
          </tr>
          <tr>
            <th>Color:</th>
            <td className="row gap-x-10">
              {detail?.colorList.map((c, i) => (
                <ColorIcon key={i} color={c.hex} />
              ))}
            </td>
          </tr>
          <tr>
            <th>Size & Amount:</th>
            <td>{getSizeAndAmountString(detail?.colorList[0].name,detail?.colorList[0].details)}</td>
          </tr>
          <tr>
            <th>Images:</th>
            <td className="flex overflow-x-auto pb-2 gap-x-3 ">
              {detail?.colorList[0].imgList.map((image, i) => (
                <img
                  key={i}
                  src={image.url}
                  alt="Product"
                  className="w-[100px] h-[150px] object-cover object-center flex-none"
                />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default ProductDetailModal;
