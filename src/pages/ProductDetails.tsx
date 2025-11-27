import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const ProductDetails = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (name),
        profiles (full_name, phone)
      `)
      .eq("id", id)
      .single();

    if (!error) setProduct(data);
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {/* Image */}
          <div>
            <img
              src={product.image_url || "/placeholder.jpg"}
              alt={product.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl font-semibold mb-3">₹ {product.price}</p>

            <p className="text-muted-foreground mb-4">
              Category: {product.categories?.name}
            </p>

            <p className="mb-6">{product.description}</p>

            <div className="border rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Seller Details</h3>
              <p>Name: {product.profiles?.full_name}</p>
              <p>Phone: {product.profiles?.phone}</p>
            </div>

            <Button size="lg" className="w-full">
              Contact Seller
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
