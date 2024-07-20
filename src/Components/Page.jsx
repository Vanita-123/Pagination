import axios from "axios";
import { useState, useEffect } from "react";

function Page() {
  const [data, setdata] = useState([]);
  const [pages, setpages] = useState(1);

  const handleprev = () => {
    setpages(pages - 1);
  };
  const handleNext = () => {
    setpages(pages + 1);
  };

  const PrevThreeNo = Array.from({ length: 3 }, (_, index) => pages - 1 - index)
    .filter((value) => value > 0)
    .reverse();

  const NextFourNo = Array.from(
    { length: 4 },
    (_, index) => pages + index
  ).filter((value) => value > 0);

  const pagesArray = [...PrevThreeNo, ...NextFourNo];
  useEffect(() => {
    axios
      .get(`https://picsum.photos/v2/list?page=${pages}&limit=5`)
      .then((res) => setdata(res.data));
  }, [pages]);

  return (
    <div>
      <div className="flex my-4 mx-4  justify-center items-center md:grid-template-columns: repeat(1, minmax(0, 1fr));">
        {data.map((item, id) => {
          return (
            <span key={id} className="justify-center items-center">
              <img
                className="mx-4 "
                src={item.download_url}
                alt=""
                width="250px"
                height="800px"
              />
            </span>
          );
        })}
      </div>
      <div>
        <span className=" flex my-7 p-5   justify-center items-center">
          {pages > 1 ? (
            <button className="m-4" onClick={handleprev}>
              ◀️
            </button>
          ) : (
            " "
          )}
          {pagesArray.map((value, id) => {
            return (
              <div key={id}>
                <div
                  onClick={() => setpages(value)}
                  className={value === pages ? `page-btn-active ` : `page-btn`}
                >
                  {value}
                </div>
              </div>
            );
          })}

          <button className="m-4" onClick={handleNext}>
            ▶️
          </button>
        </span>
      </div>
    </div>
  );
}

export default Page;
