import React, { ChangeEvent, FormEvent } from 'react'

  interface Category {
    id: number;
    name: string;
  }

  interface Product {
    id: number;
    category: Category | null; // ✅ allow null
    boutique: string;
    parent_product: string;
    name: string;
    description: string;
    price: number;
    price_discount: string;
    quantity: string;
    tags: string;
    notes: string;
    img1: File | null;
    img2: File | null;
    img3: File | null;
    img4: File | null;
    img5: File | null;
    img6: File | null;
  }

interface ProductUpdateFormProps {
	product: Product;
}

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({ product }) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const [loading, setLoading] = React.useState(true);
	const [showFormModal, setShowFormModal] = React.useState(false);
	const [products, setProducts] = React.useState<Product[]>([]);
	const [productsCategories, setProductsCategories] = React.useState<Category[]>([]);
	const [values, setValues] = React.useState<Product>(product);
	const [submitting, setSubmitting] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	
		React.useEffect(() => {
      const token = sessionStorage.getItem('access_token');
			setLoading(true);
			const headers = {
				'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
			};
      
	
			const fetchProducts = fetch(`${API_URL}/products/api/`, { method: 'GET', headers })
				.then((res) => {
					if (!res.ok) throw new Error('Failed to fetch products');
					return res.json();
				});
	
			const fetchCategories = fetch(`${API_URL}/products/categories/api/`, { method: 'GET', headers })
				.then((res) => {
					if (!res.ok) throw new Error('Failed to fetch categories');
					return res.json();
				});
	
			Promise.all([fetchProducts, fetchCategories])
				.then(([productsData, categoriesData]) => {
					setProducts(productsData);
					setProductsCategories(categoriesData);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					setError('Failed to load products or categories');
				})
				.finally(() => {
					setLoading(false);
				});
		}, [API_URL, setLoading]);
	
		const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			const { name, value } = e.target;
      // Special case: if the changed field is `category`, find and set the full object
      if (name === 'category') {
        const selectedCategory = productsCategories.find(cat => cat.id.toString() === value);
        setValues(prev => ({ ...prev, category: selectedCategory || null }));
      } else {
        setValues(prev => ({ ...prev, [name]: value }));
      }
      
    };
		const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setValues((prev) => ({ ...prev, [name]: value }));
		};
		
		const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
			const { name, files } = e.target;
			setValues((prev) => ({ ...prev, [name]: files?.[0] || null }));
		};
		
		const handleSubmit = async (e: FormEvent) => {
			e.preventDefault();
			setSubmitting(true);
		
			const formData = new FormData();
			Object.entries(values).forEach(([key, val]) => {
        if (val !== null && val !== '') {
          if (key === 'category') {
            formData.append('category_id', (val as Category).id.toString());
          } else if (key.startsWith('img') && typeof val === 'string') {
            // Skip existing file paths like "/media/img2.jpg"
            return;
          } else {
            formData.append(key, val as any);
          }
        }
      });
      
      
		
			try {
				const token = sessionStorage.getItem('access_token');
				const res = await fetch(`${API_URL}/products/api/`, {
          method: 'PUT',
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: formData,
        });
        
				if (!res.ok) throw new Error('Failed to save product');
		
				alert('Product created!');
				setValues(product);
				setShowFormModal(false); // hide form after successful save
			} catch (err) {
				console.error(err);
				alert('Error creating product');
			} finally {
				setSubmitting(false);
			}
			};
	
		if (loading) return <div className="p-6 text-center text-gray-500">Loading products...</div>;
		
		return (
			<div className='w-1/2 '>
				<div className="flex flex-col justify-between items-center">
					<button
						onClick={() => setShowFormModal(!showFormModal)}
						className="bg-blue-300 text-white py-2 rounded-lg hover:bg-blue-500 w-full font-semibold"
					>
						{showFormModal ? 'Hide Form' : 'Update'}
					</button>
				</div>
				{error && <div className="text-red-500">{error}</div>}
				{showFormModal && (
						<div className="fixed inset-0 z-50 flex items-center justify-center">
							{/* backdrop */}
							<div
								className="absolute inset-0 bg-black opacity-50"
								onClick={() => setShowFormModal(false)}
							/>
							{/* modal */}
							<div className="relative bg-white rounded-lg shadow-lg w-full h-[80vh] max-w-2xl mx-4 overflow-y-auto">
								{/* header */}
								<div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 shadow-sm ">
									<h2 className="text-xl font-semibold">Update Product</h2>
									<button
										onClick={() => setShowFormModal(false)}
										className="text-gray-600 hover:text-gray-800 text-2xl leading-none"
									>
										&times;
									</button>
								</div>
								{/* body */}
								<div className="p-6">
									<form
										onSubmit={handleSubmit}
										encType="multipart/form-data"
										className="space-y-2"
									>
										<select
                      name="category"
                      value={values.category?.id || ''}
                      onChange={handleChange}
                      className="w-full shadow-sm px-3 py-2 rounded"
                    >
                      <option value="">Select Category</option>
                      {productsCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

										<select
											name="parent_product"
											value={values.parent_product || ''}
											onChange={handleChange}
											className="w-full shadow-sm px-3 py-2 rounded"
										>
											<option value="">Select Parent Product</option>
											{products.map((product) => (
												<option key={product.id} value={product.id}>
													{product.name}
												</option>
											))}
										</select>
										<input
											type="text"
											name="name"
											placeholder="Product name"
											value={values.name}
											onChange={handleChange}
											required
											className="w-full shadow-sm px-3 py-2 rounded"
										/>
										<textarea
											name="description"
											placeholder="Description"
											value={values.description}
											onChange={handleTextAreaChange}
											rows={6}
											className="w-full shadow-sm px-3 py-2 rounded"
										/>
										<div className="grid grid-cols-2 gap-4">
											<input
												type="number"
												name="price"
												placeholder="Price"
												step="0.01"
												value={values.price}
												onChange={handleChange}
												className="shadow-sm px-3 py-2 rounded"
											/>
											<input
												type="number"
												name="price_discount"
												placeholder="Discount"
												step="0.01"
												value={values.price_discount}
												onChange={handleChange}
												className="shadow-sm px-3 py-2 rounded"
											/>
										</div>
										<div className="flex items-center w-full">
											<button
												type="button"
												onClick={() =>
													setValues((prev) => {
														const current = parseInt(prev.quantity || '0', 10)
														return { ...prev, quantity: String(Math.max(0, current - 1)) }
													})
												}
												className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 border border-gray-300"
											>
												–
											</button>
											<input
												type="text"
												id="quantity"
												name="quantity"
												placeholder="Quantity"
												value={values.quantity}
												readOnly
												className="w-full text-center border-t border-b border-gray-300 px-2 py-1"
											/>
											<button
												type="button"
												onClick={() =>
													setValues((prev) => {
														const current = parseInt(prev.quantity || '0', 10)
														return { ...prev, quantity: String(current + 1) }
													})
												}
												className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300 border border-gray-300"
											>
												+
											</button>
										</div>
										<input
											type="text"
											name="tags"
											placeholder="Tags (comma-separated)"
											value={values.tags}
											onChange={handleChange}
											className="w-full border px-3 py-2 rounded hidden"
										/>
										<textarea
											name="notes"
											placeholder="Notes"
											value={values.notes}
											onChange={handleTextAreaChange}
											className="w-full border px-3 py-2 rounded hidden"
										/>
										<div className="grid grid-cols-2 gap-2 border border-gray-100 shadow-sm  p-2 rounded">
											{Array.from({ length: 6 }, (_, i) => (
												<input
													key={i}
													type="file"
													name={`img${i + 1}`}
													accept="image/*"
													onChange={handleFileChange}
													className="w-full border border-gray-100 shadow-sm px-3 py-2 rounded"
												/>
											))}
										</div>
										<button
											type="submit"
											disabled={submitting}
											className="
												w-full
												bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
												text-white font-semibold
												py-2 rounded-lg shadow-md
												hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700
												focus:outline-none focus:ring-2 focus:ring-yellow-300
												transition-colors
												disabled:opacity-50 disabled:cursor-not-allowed
											"
										>
											{submitting ? 'Saving…' : 'Save Product'}
										</button>
									</form>
								</div>
							</div>
						</div>
					)}
			</div>
		);
	};
	
export default ProductUpdateForm;