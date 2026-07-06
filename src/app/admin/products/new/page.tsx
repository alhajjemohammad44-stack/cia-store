'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Save, ArrowLeft, Upload, Plus, X, Eye, EyeOff,
  Package, Tag, DollarSign, Image, FileText
} from 'lucide-react'

const categories = [
  { value: 'bloxfruit', label: 'Blox Fruits' },
  { value: 'robux', label: 'Robux' },
  { value: 'accounts', label: 'Accounts' },
  { value: 'gamepasses', label: 'Gamepasses' },
]

const subCategories: Record<string, { value: string; label: string }[]> = {
  bloxfruit: [
    { value: 'fruits', label: 'Fruits' },
    { value: 'perms', label: 'Perms' },
    { value: 'gamepasses', label: 'Gamepasses' },
  ],
  accounts: [
    { value: 'bloxfruit-accounts', label: 'Blox Fruit Accounts' },
  ],
}

const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical']
const currencies = ['USD', 'EUR', 'GBP', 'SAR', 'AED']

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    nameAr: '',
    slug: '',
    description: '',
    descriptionAr: '',
    category: '',
    subCategory: '',
    price: '',
    originalPrice: '',
    currency: 'USD',
    rarity: '',
    stockCount: '100',
    inStock: true,
    productType: 'item',
    features: [''],
    deliveryInfo: '',
    playerIdRequired: true,
    imageUrl: '',
  })

  const [preview, setPreview] = useState(false)

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  const handleNameChange = (name: string) => {
    setForm({ ...form, name, slug: generateSlug(name) })
  }

  const addFeature = () => setForm({ ...form, features: [...form.features, ''] })
  const removeFeature = (i: number) => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })
  const updateFeature = (i: number, val: string) => {
    const features = [...form.features]
    features[i] = val
    setForm({ ...form, features })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-black text-white">New Product</h1>
            <p className="text-white/40 text-sm">Add a new product to your store</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreview(!preview)} className="gap-1.5">
            {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {preview ? 'Edit' : 'Preview'}
          </Button>
          <Button className="gap-1.5 shadow-[0_0_20px_rgba(0,163,255,0.2)]">
            <Save className="w-4 h-4" />
            Save Product
          </Button>
        </div>
      </div>

      {preview ? (
        /* Preview Mode */
        <div className="rounded-2xl bg-dark-100 border border-white/5 p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-electric/20 border border-electric/30 flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-electric" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white mb-2">{form.name || 'Product Name'}</h2>
          <p className="text-white/50 mb-4">{form.description || 'Product description will appear here.'}</p>
          <div className="text-3xl font-black text-electric glow-text">
            {form.price ? `$${parseFloat(form.price).toFixed(2)}` : '$0.00'}
          </div>
          {form.rarity && <Badge rarity={form.rarity as any} className="mt-3">{form.rarity}</Badge>}
        </div>
      ) : (
        /* Edit Form */
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-electric" />
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-white/60 mb-1.5">Product Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50"
                    placeholder="e.g., Dragon Fruit"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-white/60 mb-1.5">Arabic Name</label>
                  <input
                    type="text"
                    value={form.nameAr}
                    onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50"
                    placeholder="اسم المنتج بالعربية"
                    dir="rtl"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-white/60 mb-1.5">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white/50 text-sm font-mono focus:outline-none focus:border-electric/50"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-white/60 mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 resize-none"
                    placeholder="Describe the product..."
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-white/60 mb-1.5">Arabic Description</label>
                  <textarea
                    value={form.descriptionAr}
                    onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 resize-none"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                Pricing & Inventory
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Price *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full h-11 pl-8 pr-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Original Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                    <input
                      type="number"
                      value={form.originalPrice}
                      onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                      className="w-full h-11 pl-8 pr-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Currency</label>
                  <select
                    value={form.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50"
                  >
                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Stock Count</label>
                  <input
                    type="number"
                    value={form.stockCount}
                    onChange={(e) => setForm({ ...form, stockCount: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Rarity</label>
                  <select
                    value={form.rarity}
                    onChange={(e) => setForm({ ...form, rarity: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50"
                  >
                    <option value="">None</option>
                    {rarities.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 h-11">
                    <input
                      type="checkbox"
                      checked={form.inStock}
                      onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                      className="w-5 h-5 rounded border-white/10 bg-dark accent-electric"
                    />
                    <span className="text-sm text-white/70">In Stock</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-neon-cyan" />
                Features
              </h3>
              <div className="space-y-2">
                {form.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => updateFeature(i, e.target.value)}
                      className="flex-1 h-10 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 text-sm"
                      placeholder={`Feature ${i + 1}`}
                    />
                    {form.features.length > 1 && (
                      <button onClick={() => removeFeature(i)} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-red-400">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addFeature} className="gap-1">
                <Plus className="w-3 h-3" />
                Add Feature
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">Delivery Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Delivery Instructions</label>
                  <textarea
                    value={form.deliveryInfo}
                    onChange={(e) => setForm({ ...form, deliveryInfo: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 resize-none"
                    placeholder="How will this product be delivered?"
                  />
                </div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.playerIdRequired}
                    onChange={(e) => setForm({ ...form, playerIdRequired: e.target.checked })}
                    className="w-5 h-5 rounded border-white/10 bg-dark accent-electric"
                  />
                  <div>
                    <span className="text-sm text-white/70 font-medium">Require Player ID</span>
                    <p className="text-xs text-white/30">Customer must enter in-game username at checkout</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">Organization</h3>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value, subCategory: '' })}
                  className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50"
                >
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              {form.category && subCategories[form.category] && (
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Sub Category</label>
                  <select
                    value={form.subCategory}
                    onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50"
                  >
                    <option value="">None</option>
                    {subCategories[form.category].map(sc => (
                      <option key={sc.value} value={sc.value}>{sc.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Product Type</label>
                <select
                  value={form.productType}
                  onChange={(e) => setForm({ ...form, productType: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50"
                >
                  <option value="item">Item / Fruit</option>
                  <option value="account">Account</option>
                  <option value="gamepass">Gamepass</option>
                  <option value="robux">Robux / Currency</option>
                  <option value="service">Service</option>
                </select>
              </div>
            </div>

            {/* Image */}
            <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Image className="w-4 h-4 text-neon-purple" />
                Image
              </h3>
              <div className="aspect-square rounded-xl bg-dark border-2 border-dashed border-white/10 hover:border-electric/30 transition-all flex flex-col items-center justify-center cursor-pointer">
                <Upload className="w-8 h-8 text-white/20 mb-2" />
                <span className="text-sm text-white/30">Click to upload</span>
                <span className="text-xs text-white/20 mt-1">PNG, JPG, WebP</span>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Or image URL</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Status */}
            <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">Status</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Active</span>
                <button
                  onClick={() => setForm({ ...form, inStock: !form.inStock })}
                  className={`relative w-12 h-6 rounded-full transition-all ${form.inStock ? 'bg-electric' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form.inStock ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
