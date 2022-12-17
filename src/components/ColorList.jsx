import React, { useState } from "react";
import { Select } from "antd";
import ImagesUploader from "./ImagesUploader";
import ColorIcon from "./ColorIcon";
import deleteIcon from '../images/delete-gray.svg'

const { Option } = Select;

const colors = [
  {
    name: "Black",
    hex: "#000000",
  },
  {
    name: "Mint",
    hex: "#8FD9C4",
  },
  {
    name: "Green",
    hex: "#32CD32",
  },
  {
    name: "Be",
    hex: "#EDD3AB",
  },
  {
    name: "Red",
    hex: "#F81515",
  },
  {
    name: "Gray",
    hex: "#696969",
  },
];

const ColorList = () => {
  const [colorList, setColorList] = useState([{}]);

  const handleAddColor = () => {
    setColorList([...colorList,{}]);
  };

  return (
    <>
      {colorList.map((color, i) => (
        <React.Fragment key={i}>
          <tr>
            <th className="required">Color:</th>
            <td>
              <Select
                defaultValue={colors[0].name}
                size="large"
                // suffixIcon={<img src={selectIcon} alt='Select' className="h-2"/>}
                className="w-full"
              >
                {colors.map((color, i) => (
                  <Option key={i} value={color.name}>
                    <div className="row gap-x-[10px] font-inter font-[16px]">
                      <ColorIcon color={color.hex} />
                      <p className="mb-0">{color.name}</p>
                    </div>
                  </Option>
                ))}
              </Select>
            </td>
            {(i!==0) && <td className="w-[24px]"><img src={deleteIcon} alt='Delete'/></td>}
          </tr>
          <tr>
            <th className="align-top">Images:</th>
            <td>
              <ImagesUploader />
            </td>
          </tr>
        </React.Fragment>
      ))}
      <tr>
        <th>
          <button onClick={handleAddColor} className="add-color-button">
            Add Color
          </button>
        </th>
        <td></td>
      </tr>
    </>
  );
};

export default ColorList;
