import { useState } from "react";
import { useSearchParams } from "react-router-dom"; // <--- Import cái này
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FilterSort from "./FilterSort";

// Xóa prop searchText đi, không cần nhận từ cha nữa
function ListOfOrchids({ orchidList, onShowModal }) {
  // 1. Lấy từ khóa search từ URL xuống
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("q") || ""; // Nếu ko có thì là chuỗi rỗng

  const [filterCategory, setFilterCategory] = useState("");
  const [sortType, setSortType] = useState("");

  const getProcessedList = () => {
    let processed = [...orchidList];

    // 2. Logic lọc theo searchText (Lấy từ URL)
    if (searchText) {
      processed = processed.filter((orchid) =>
        orchid.orchidName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterCategory) {
      processed = processed.filter(
        (orchid) => orchid.category === filterCategory
      );
    }

    if (sortType) {
      // ... (Logic sort giữ nguyên)
      processed.sort((a, b) => {
        switch (sortType) {
          case "name-asc":
            return a.orchidName.localeCompare(b.orchidName);
          case "name-desc":
            return b.orchidName.localeCompare(a.orchidName);
          case "price-asc":
            return (a.price || 0) - (b.price || 0);
          case "price-desc":
            return (b.price || 0) - (a.price || 0);
          default:
            return 0;
        }
      });
    }
    return processed;
  };

  const categories = [...new Set(orchidList.map((orchid) => orchid.category))];
  const displayedOrchids = getProcessedList();

  return (
    <>
      {/* SearchBar đã nằm ở Header nên xóa ở đây nếu có */}
      <FilterSort
        categories={categories}
        onFilterChange={setFilterCategory}
        onSortChange={setSortType}
      />

      <Row>
        {/* ... (Phần hiển thị danh sách giữ nguyên y hệt cũ) */}
        {displayedOrchids.map((orchid) => (
          <Col md={3} key={orchid.id} className="mb-4 d-flex">
            {/* ... Nội dung Card ... */}
            <Card className="h-100 w-100 position-relative shadow-sm">
              {/* ... code hiển thị giữ nguyên ... */}
              <Card.Img
                variant="top"
                src={orchid.image}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{orchid.orchidName}</Card.Title>
                {/* ... */}
                <Button onClick={() => onShowModal(orchid)}>Detail</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ListOfOrchids;
