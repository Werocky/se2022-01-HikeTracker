import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import API from "../../API";

function SearchHuts(props) {

  const [locationList, setLocationList] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const [locType, setLocType] = useState('');
  const [locVal, setLocVal] = useState('');
  const [whenOpen, setWhenOpen] = useState('');
  const [beds, setBeds] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [name, setName] = useState('');


  useEffect(() => {
    const loadLocation = async () => {
      const locationObj = await API.getHutsLocations();
      //console.log(locationObj);
      setLocationList(locationObj);
      setLoading(false);
    }
    try {
      loadLocation();
    } catch (err) {
      //handling err
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const loc = locVal ? { locationType: locType, location: locVal } : null;
    const huts = await API.getHutsFilters(name ? name : null, loc, whenOpen ? whenOpen : null, beds ? beds : null, price ? price : null);
    console.log(huts);
    props.setHuts(huts);
    props.setLoading(false);
  }

  const handleReset = (event) => {
    props.setLoading(true);
    setLocType('');
    setLocVal('');
    setWhenOpen('');
    setBeds(0);
    setPrice(0);
    setName('');
  }

  return (
    <>
      {!loading &&
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="locationFilter">
                <Form.Label>Location filter</Form.Label>
                <Form.Control as="select" value={locType} aria-label="Location Type"
                  onChange={(event) => {
                    setLocType(event.target.value)
                  }}>
                  <option>Select Location Type</option>
                  <option value={"City"}>City</option>
                  <option value={"Province"}>Province</option>
                  <option value={"Region"}>Region</option>
                  <option value={"Country"}>Country</option>
                </Form.Control>

                <Form.Control as="select" value={locVal} aria-label="Select location"
                  onChange={(event) => {
                    setLocVal(event.target.value)
                  }}>
                  <option>Select {locType}</option>
                  {
                    locType &&
                      locType === 'City' ?
                      locationList.City.map((el) => {
                        return <option key={el} value={el}>{el}</option>
                      })
                      : locType === 'Province' ?
                        locationList.Province.map((el) => {
                          return <option key={el} value={el}>{el}</option>
                        })
                        : locType === 'Region' ?
                          locationList.Region.map((el) => {
                            return <option key={el} value={el}>{el}</option>
                          })
                          : locType === 'Country' ?
                            locationList.Country.map((el) => {
                              return <option key={el} value={el}>{el}</option>
                            })
                            : <></>
                  }
                </Form.Control>

              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Opening Period filter</Form.Label>
                <Form.Control as="select" value={whenOpen} aria-label="Select Opening Period"
                  onChange={(event) => {
                    setWhenOpen(event.target.value)
                  }}>
                  <option>Select Opening Period</option>
                  <option value="S">Summer</option>
                  <option value="W">Winter</option>
                  <option value="Y">All year</option>
                  <option value="C">Closed</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Number of Beds</Form.Label>
                <Form.Control type="number" placeholder="Insert number of beds"
                  onChange={(event) => {
                    setBeds(event.target.value)
                  }} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Average price</Form.Label>
                <Form.Control type="number" placeholder="Insert avg Price"
                  onChange={(event) => {
                    setPrice(event.target.value)
                  }} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Hut Name</Form.Label>
                <Form.Control type="text" placeholder="Insert Hut Name"
                  onChange={(event) => {
                    setName(event.target.value)
                  }} />
              </Form.Group>
            </Col>

            <Col>
              <Button variant="primary" type="submit" >
                Search
              </Button>
              <Button variant="primary" type="reset" onClick={handleReset}>
                Reset
              </Button>
            </Col>

          </Row>
        </Form>
      }
    </>
  )
}


export default SearchHuts;