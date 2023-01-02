import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Tooltip, Form } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { getColors } from "../actions/colors";
import ImagesUploader from "./ImagesUploader";
import ColorIcon from "./ColorIcon";
import ReadOnlySuffix from "./ReadOnlySuffix";

const { Option } = Select;

const ColorList = ({
  colorList,
  setColorList,
  currItem,
  deleteString,
  setDeleteString,
}) => {
  const [colorsData, setColorsData] = useState();
  const scrollRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const { colors } = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  //Get all colors
  const getAllColors = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_COLORS,
        routes.getAccessTokenHeader(token)
      );
      setColorsData(result.data);
      dispatch(getColors(result.data));
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

  const handleAddColor = () => {
    setColorList([...colorList, { colorId: 1 }]);
  };

  const handleDeleteColor = (i) => {
    setColorList(colorList.filter((_, index) => index !== i));
  };

  const handleSelectColor = (value, i) => {
    setColorList(
      colorList.map((color, index) =>
        index === i ? { ...color, colorId: value } : { ...color }
      )
    );
  };

  useEffect(() => {
    if (currentUser) {
      if (colors) {
        setColorsData(colors);
      } else {
        getAllColors();
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (colorList.length < 2) return;
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [colorList]);

  return (
    <>
      {colorList.map((color, i) => (
        <React.Fragment key={i}>
          <tr>
            <th className="required">Color:</th>
            <td>
              <Select
                size="large"
                disabled={currItem}
                suffixIcon={currItem && <ReadOnlySuffix />}
                loading={!colorsData}
                className="w-full"
                defaultValue={1}
                value={color.colorId}
                onChange={(value) => handleSelectColor(value, i)}
              >
                {colorsData?.map((color, i) => (
                  <Option key={i} value={color.colorId}>
                    <div className="row gap-x-[10px] font-inter font-[16px]">
                      <ColorIcon color={color.hex} />
                      <p className="mb-0 text-[18px]">{color.color}</p>
                    </div>
                  </Option>
                ))}
              </Select>
            </td>
            {!currItem && colorList.length > 1 && (
              <td className="w-[24px] align-top pt-[8px]">
                <Tooltip title="Delete color">
                  <button
                    className="flex items-center group"
                    onClick={() => handleDeleteColor(i)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.75008 0.25V1.66667H0.666748V4.5H2.08341V22.9167C2.08341 23.6681 2.38193 24.3888 2.91328 24.9201C3.44463 25.4515 4.1653 25.75 4.91675 25.75H19.0834C19.8349 25.75 20.5555 25.4515 21.0869 24.9201C21.6182 24.3888 21.9167 23.6681 21.9167 22.9167V4.5H23.3334V1.66667H16.2501V0.25H7.75008ZM4.91675 4.5H19.0834V22.9167H4.91675V4.5ZM7.75008 7.33333V20.0833H10.5834V7.33333H7.75008ZM13.4167 7.33333V20.0833H16.2501V7.33333H13.4167Z"
                        className="fill-black50 group-hover:fill-secondary"
                      />
                    </svg>
                  </button>
                </Tooltip>
              </td>
            )}
          </tr>
          <tr>
            <th className="align-top">Images:</th>
            <td>
              <ImagesUploader
                setColorList={setColorList}
                colorList={colorList}
                index={i}
                fileList={color.fileList}
                deleteString={deleteString}
                setDeleteString={setDeleteString}
              />
            </td>
          </tr>
        </React.Fragment>
      ))}
      <tr>
        <th>
          <button
            ref={scrollRef}
            onClick={handleAddColor}
            className="add-color-button"
          >
            Add Color
          </button>
        </th>
        <td></td>
      </tr>
    </>
  );
};

export default ColorList;
