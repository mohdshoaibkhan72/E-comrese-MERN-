import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container } from "react-bootstrap";

function FakeApi() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products",
    })
      .then(async ({ data }) => {
        const productsWithImages = await Promise.all(
          data.map(async (product) => {
            const imageResponse = await axios({
              method: "GET",
              url: `https://picsum.photos/200/300?random=${product.id}`,
            });

            return {
              ...product,
              image: imageResponse.config.url,
            };
          })
        );

        setData(productsWithImages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <section>
      <h1>Fake Store API response:</h1>
      <Container>
        {loading && "Loading..."}
        {!!data && data.length > 0 ? (
          <div className="row">
            {data.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <Card>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>ID: {product.id}</Card.Text>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Button variant="primary">Add to Cart</Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p>API did not provide any products, try again.</p>
        )}
      </Container>
    </section>
  );
}

export default FakeApi;
