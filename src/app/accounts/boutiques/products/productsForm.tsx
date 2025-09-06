'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Category {
	id: string;
	name: string;
}

interface ProductFormValues {
	boutique: string;
	category: string;
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


const initialValues: ProductFormValues = {
  boutique: '2',
	category: '',
	parent_product: '',
	name: '',
  description: '',
  price: 0,
  price_discount: '',
  quantity: '',
  tags: '',
  notes: '',
  img1: null,
  img2: null,
  img3: null,
  img4: null,
  img5: null,
  img6: null,
};

const BoutiqueProductsForm: React.FC = () => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [products, setProducts] = useState<any[]>([]);
	const [productsCategories, setProductsCategories] = useState<Category[]>([]);
  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	React.useEffect(() => {
		setLoading(true);
		const headers = {
			'Content-Type': 'application/json',
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
		setValues((prev) => ({ ...prev, [name]: value }));
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
		  if (val !== null) {
        if (key === "category") {
          formData.append("category_id", val);
        } else {
          formData.append(key, val as any);
        }
        
		  }
		});

	
		try {
		  const token = sessionStorage.getItem('access_token');
		  const res = await fetch(`${API_URL}/products/api/`, {
			method: 'POST',
			headers: {
			  Authorization: token ? `Bearer ${token}` : '',
			},
			body: formData,
		  });
	
		  if (!res.ok) throw new Error('Failed to save product');
	
		  alert('Product created!');
		  setValues(initialValues);
		  setShowForm(false); // hide form after successful save
		} catch (err) {
		  console.error(err);
		  alert('Error creating product');
		} finally {
		  setSubmitting(false);
		}
	  };

	if (loading) return <div className="p-6 text-center text-gray-500">Loading products...</div>;
	
  return (
		<div className=''>
			<div className="flex flex-col justify-between items-center">
				<button
					onClick={() => setShowForm(!showForm)}
					className="
						w-full
						bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold
						py-2 rounded-lg shadow-md
						hover:from-yellow-500 hover:to-yellow-600
						focus:outline-none focus:ring-2 focus:ring-yellow-300
						transition-colors
						disabled:opacity-50 disabled:cursor-not-allowed
					"
				>
					{showForm ? 'Hide Form' : 'Add Product'}
				</button>
			</div>
			{error && <div className="text-red-500">{error}</div>}
			{showForm && (
				<div className="mb-4">
					<form
						onSubmit={handleSubmit}
						encType="multipart/form-data"
						className="space-y-4 max-w-lg mx-auto p-4 bg-white rounded shadow"
					>
						<select
							name="category"
							value={values.category}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded"
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
							value={values.parent_product}
							onChange={handleChange}
							className="w-full border px-3 py-2 rounded"
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
							className="w-full border px-3 py-2 rounded"
						/>
						<textarea
							name="description"
							placeholder="Description"
							value={values.description}
							onChange={handleTextAreaChange}
							rows={6}
							className="w-full border px-3 py-2 rounded"
						/>
		
						<div className="grid grid-cols-2 gap-4">
							<input
								type="number"
								name="price"
								placeholder="Price"
								step="0.01"
								value={values.price}
								onChange={handleChange}
								className="border px-3 py-2 rounded"
							/>
							<input
								type="number"
								name="price_discount"
								placeholder="Discount"
								step="0.01"
								value={values.price_discount}
								onChange={handleChange}
								className="border px-3 py-2 rounded"
							/>
						</div>
		
						<div className="flex items-center w-full">
							<button
								type="button"
								onClick={() =>
									setValues(prev => {
										const current = parseInt(prev.quantity || '0', 10);
										return { ...prev, quantity: String(Math.max(0, current - 1)) };
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
									setValues(prev => {
										const current = parseInt(prev.quantity || '0', 10);
										return { ...prev, quantity: String(current + 1) };
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
						<div className="grid grid-cols-2 gap-2 border p-2 rounded">
							{/* up to 6 image uploads */}
							{Array.from({ length: 6 }, (_, i) => (
								<input
									key={i}
									type="file"
									name={`img${i + 1}`}
									accept="image/*"
									onChange={handleFileChange}
									className="w-full border px-3 py-2 rounded"
								/>
							))}
						</div>
		
						<button
							type="submit"
							disabled={submitting}
							className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
						>
							{submitting ? 'Saving…' : 'Save Product'}
						</button>
					</form>
				</div>
			)}
		</div>
  );
};

export default BoutiqueProductsForm;