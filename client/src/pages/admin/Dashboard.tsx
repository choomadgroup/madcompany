import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useLocation } from "wouter";
import { Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, FormControlLabel } from "@mui/material";
import { motion } from "framer-motion";

const BLOG_CATEGORIES = ["Brand", "Fashion", "Food", "Web Dev"];
const PORTFOLIO_CATEGORIES = ["Brand", "Fashion", "Food", "Web"];

type BlogItem = { _id: string; title: string; category: string; description: string; content: string; readTime: string; published: boolean; createdAt: string };
type PortfolioItem = { _id: string; title: string; category: string; description: string; tags: string[]; published: boolean; createdAt: string };

const emptyBlog = { title: "", category: "Brand", description: "", content: "", readTime: "5 menit", published: false };
const emptyPortfolio = { title: "", category: "Brand", description: "", tags: "", published: false };

const categoryColors: Record<string, string> = {
    Brand: "bg-purple-100 text-purple-700",
    Fashion: "bg-pink-100 text-pink-700",
    Food: "bg-orange-100 text-orange-700",
    "Web Dev": "bg-blue-100 text-blue-700",
    Web: "bg-blue-100 text-blue-700"
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboard() {
    const { token, logout, isAuthenticated } = useAdmin();
    const [, setLocation] = useLocation();
    const [tab, setTab] = useState<"blog" | "portfolio">("blog");

    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(false);

    const [blogModal, setBlogModal] = useState(false);
    const [portfolioModal, setPortfolioModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
    const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);

    const [blogForm, setBlogForm] = useState(emptyBlog);
    const [portfolioForm, setPortfolioForm] = useState(emptyPortfolio);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{ type: "blog" | "portfolio"; id: string } | null>(null);

    useEffect(() => {
        if (!isAuthenticated) setLocation("/admin/login");
    }, [isAuthenticated]);

    const authHeader = useCallback(() => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }), [token]);

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/blogs", { headers: authHeader() });
            if (res.ok) setBlogs(await res.json());
        } finally { setLoading(false); }
    }, [authHeader]);

    const fetchPortfolios = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/portfolios", { headers: authHeader() });
            if (res.ok) setPortfolios(await res.json());
        } finally { setLoading(false); }
    }, [authHeader]);

    useEffect(() => { fetchBlogs(); fetchPortfolios(); }, [fetchBlogs, fetchPortfolios]);

    const openAddBlog = () => { setBlogForm(emptyBlog); setEditingBlog(null); setBlogModal(true); };
    const openEditBlog = (b: BlogItem) => {
        setBlogForm({ title: b.title, category: b.category, description: b.description, content: b.content, readTime: b.readTime, published: b.published });
        setEditingBlog(b);
        setBlogModal(true);
    };

    const openAddPortfolio = () => { setPortfolioForm(emptyPortfolio); setEditingPortfolio(null); setPortfolioModal(true); };
    const openEditPortfolio = (p: PortfolioItem) => {
        setPortfolioForm({ title: p.title, category: p.category, description: p.description, tags: p.tags.join(", "), published: p.published });
        setEditingPortfolio(p);
        setPortfolioModal(true);
    };

    const saveBlog = async () => {
        setSaving(true);
        try {
            const url = editingBlog ? `/api/admin/blogs/${editingBlog._id}` : "/api/admin/blogs";
            const method = editingBlog ? "PUT" : "POST";
            const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify(blogForm) });
            if (res.ok) { setBlogModal(false); fetchBlogs(); }
        } finally { setSaving(false); }
    };

    const savePortfolio = async () => {
        setSaving(true);
        try {
            const tags = portfolioForm.tags.split(",").map(t => t.trim()).filter(Boolean);
            const url = editingPortfolio ? `/api/admin/portfolios/${editingPortfolio._id}` : "/api/admin/portfolios";
            const method = editingPortfolio ? "PUT" : "POST";
            const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify({ ...portfolioForm, tags }) });
            if (res.ok) { setPortfolioModal(false); fetchPortfolios(); }
        } finally { setSaving(false); }
    };

    const deleteBlog = async (id: string) => {
        await fetch(`/api/admin/blogs/${id}`, { method: "DELETE", headers: authHeader() });
        setDeleteConfirm(null);
        fetchBlogs();
    };

    const deletePortfolio = async (id: string) => {
        await fetch(`/api/admin/portfolios/${id}`, { method: "DELETE", headers: authHeader() });
        setDeleteConfirm(null);
        fetchPortfolios();
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <img src="/icons/icon-512x512.png" alt="logo" className="w-8" />
                    <Typography className="font-sans text-lg font-semibold text-gray-800">
                        Choomad Admin
                    </Typography>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setLocation("/")}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 font-sans text-sm text-gray-600 hover:bg-gray-50"
                    >
                        Lihat Site
                    </button>
                    <button
                        onClick={logout}
                        className="rounded-lg bg-red-50 px-3 py-1.5 font-sans text-sm text-red-600 hover:bg-red-100"
                    >
                        Keluar
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-52 shrink-0 border-r border-gray-200 bg-white p-4">
                    <nav className="flex flex-col gap-1">
                        {(["blog", "portfolio"] as const).map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left font-sans text-sm font-medium transition-colors ${tab === t ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                            >
                                <span>{t === "blog" ? "📝" : "🖼️"}</span>
                                {t === "blog" ? "Blog & Artikel" : "Portofolio"}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main */}
                <main className="flex-1 p-6">
                    {loading ? (
                        <div className="flex h-48 items-center justify-center">
                            <CircularProgress size={32} />
                        </div>
                    ) : tab === "blog" ? (
                        <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <Typography className="font-sans text-xl font-semibold text-gray-800">Blog & Artikel</Typography>
                                <button
                                    onClick={openAddBlog}
                                    className="rounded-lg bg-gray-900 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-gray-700"
                                >
                                    + Tambah Artikel
                                </button>
                            </div>

                            {blogs.length === 0 ? (
                                <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200">
                                    <span className="text-3xl">📝</span>
                                    <Typography className="font-sans text-sm text-gray-500">Belum ada artikel. Tambah sekarang!</Typography>
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                    <table className="w-full">
                                        <thead className="border-b border-gray-100 bg-gray-50">
                                            <tr>
                                                {["Judul", "Kategori", "Tanggal", "Status", "Aksi"].map(h => (
                                                    <th key={h} className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {blogs.map(b => (
                                                <tr key={b._id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3">
                                                        <Typography className="font-sans text-sm font-medium text-gray-800 line-clamp-1">{b.title}</Typography>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold ${categoryColors[b.category] ?? "bg-gray-100 text-gray-600"}`}>{b.category}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="font-sans text-xs text-gray-500">{formatDate(b.createdAt)}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold ${b.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                                            {b.published ? "Publik" : "Draft"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button onClick={() => openEditBlog(b)} className="font-sans text-xs text-blue-600 hover:underline">Edit</button>
                                                            <button onClick={() => setDeleteConfirm({ type: "blog", id: b._id })} className="font-sans text-xs text-red-500 hover:underline">Hapus</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <Typography className="font-sans text-xl font-semibold text-gray-800">Portofolio</Typography>
                                <button
                                    onClick={openAddPortfolio}
                                    className="rounded-lg bg-gray-900 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-gray-700"
                                >
                                    + Tambah Portofolio
                                </button>
                            </div>

                            {portfolios.length === 0 ? (
                                <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200">
                                    <span className="text-3xl">🖼️</span>
                                    <Typography className="font-sans text-sm text-gray-500">Belum ada portofolio. Tambah sekarang!</Typography>
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                    <table className="w-full">
                                        <thead className="border-b border-gray-100 bg-gray-50">
                                            <tr>
                                                {["Judul", "Kategori", "Tags", "Status", "Aksi"].map(h => (
                                                    <th key={h} className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-wide text-gray-500">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {portfolios.map(p => (
                                                <tr key={p._id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3">
                                                        <Typography className="font-sans text-sm font-medium text-gray-800 line-clamp-1">{p.title}</Typography>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold ${categoryColors[p.category] ?? "bg-gray-100 text-gray-600"}`}>{p.category}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex flex-wrap gap-1">
                                                            {p.tags.slice(0, 3).map((tag, i) => (
                                                                <span key={i} className="rounded-full border border-gray-200 px-2 py-0.5 font-sans text-xs text-gray-500">{tag}</span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                                            {p.published ? "Publik" : "Draft"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button onClick={() => openEditPortfolio(p)} className="font-sans text-xs text-blue-600 hover:underline">Edit</button>
                                                            <button onClick={() => setDeleteConfirm({ type: "portfolio", id: p._id })} className="font-sans text-xs text-red-500 hover:underline">Hapus</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </motion.div>
                    )}
                </main>
            </div>

            {/* Blog Modal */}
            <Dialog open={blogModal} onClose={() => setBlogModal(false)} maxWidth="md" fullWidth>
                <DialogTitle className="font-sans font-semibold">
                    {editingBlog ? "Edit Artikel" : "Tambah Artikel"}
                </DialogTitle>
                <DialogContent className="flex flex-col gap-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Judul *</label>
                            <input
                                value={blogForm.title}
                                onChange={e => setBlogForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="Judul artikel..."
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Kategori</label>
                            <select
                                value={blogForm.category}
                                onChange={e => setBlogForm(f => ({ ...f, category: e.target.value }))}
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            >
                                {BLOG_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Estimasi Baca</label>
                            <input
                                value={blogForm.readTime}
                                onChange={e => setBlogForm(f => ({ ...f, readTime: e.target.value }))}
                                placeholder="5 menit"
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                        <div className="col-span-2 flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Deskripsi Singkat *</label>
                            <textarea
                                value={blogForm.description}
                                onChange={e => setBlogForm(f => ({ ...f, description: e.target.value }))}
                                rows={2}
                                placeholder="Ringkasan artikel untuk preview..."
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                        <div className="col-span-2 flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Isi Artikel *</label>
                            <textarea
                                value={blogForm.content}
                                onChange={e => setBlogForm(f => ({ ...f, content: e.target.value }))}
                                rows={8}
                                placeholder="Tulis isi artikel di sini..."
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                        <div className="col-span-2">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={blogForm.published}
                                        onChange={e => setBlogForm(f => ({ ...f, published: e.target.checked }))}
                                    />
                                }
                                label={<span className="font-sans text-sm text-gray-700">Publikasikan (tampil di halaman Blog)</span>}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="px-6 pb-4">
                    <Button onClick={() => setBlogModal(false)} className="font-sans capitalize text-gray-600">Batal</Button>
                    <Button
                        onClick={saveBlog}
                        disabled={saving || !blogForm.title || !blogForm.description || !blogForm.content}
                        variant="contained"
                        className="rounded-lg bg-gray-900 font-sans capitalize text-white shadow-none hover:bg-gray-700"
                    >
                        {saving ? <CircularProgress size={16} className="text-white" /> : "Simpan"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Portfolio Modal */}
            <Dialog open={portfolioModal} onClose={() => setPortfolioModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle className="font-sans font-semibold">
                    {editingPortfolio ? "Edit Portofolio" : "Tambah Portofolio"}
                </DialogTitle>
                <DialogContent className="flex flex-col gap-4 pt-2">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Judul *</label>
                            <input
                                value={portfolioForm.title}
                                onChange={e => setPortfolioForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="Nama proyek..."
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Kategori</label>
                            <select
                                value={portfolioForm.category}
                                onChange={e => setPortfolioForm(f => ({ ...f, category: e.target.value }))}
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            >
                                {PORTFOLIO_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Deskripsi *</label>
                            <textarea
                                value={portfolioForm.description}
                                onChange={e => setPortfolioForm(f => ({ ...f, description: e.target.value }))}
                                rows={3}
                                placeholder="Deskripsi proyek..."
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-sans text-sm font-medium text-gray-700">Tags</label>
                            <input
                                value={portfolioForm.tags}
                                onChange={e => setPortfolioForm(f => ({ ...f, tags: e.target.value }))}
                                placeholder="Logo, Brand Guide, UI/UX (pisahkan dengan koma)"
                                className="rounded-lg border border-gray-200 px-3 py-2 font-sans text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={portfolioForm.published}
                                    onChange={e => setPortfolioForm(f => ({ ...f, published: e.target.checked }))}
                                />
                            }
                            label={<span className="font-sans text-sm text-gray-700">Publikasikan (tampil di halaman Portofolio)</span>}
                        />
                    </div>
                </DialogContent>
                <DialogActions className="px-6 pb-4">
                    <Button onClick={() => setPortfolioModal(false)} className="font-sans capitalize text-gray-600">Batal</Button>
                    <Button
                        onClick={savePortfolio}
                        disabled={saving || !portfolioForm.title || !portfolioForm.description}
                        variant="contained"
                        className="rounded-lg bg-gray-900 font-sans capitalize text-white shadow-none hover:bg-gray-700"
                    >
                        {saving ? <CircularProgress size={16} className="text-white" /> : "Simpan"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirm */}
            <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" fullWidth>
                <DialogTitle className="font-sans font-semibold">Hapus Item?</DialogTitle>
                <DialogContent>
                    <Typography className="font-sans text-sm text-gray-600">
                        Item ini akan dihapus permanen dan tidak bisa dikembalikan.
                    </Typography>
                </DialogContent>
                <DialogActions className="px-6 pb-4">
                    <Button onClick={() => setDeleteConfirm(null)} className="font-sans capitalize text-gray-600">Batal</Button>
                    <Button
                        onClick={() => {
                            if (!deleteConfirm) return;
                            if (deleteConfirm.type === "blog") deleteBlog(deleteConfirm.id);
                            else deletePortfolio(deleteConfirm.id);
                        }}
                        variant="contained"
                        className="rounded-lg bg-red-600 font-sans capitalize text-white shadow-none hover:bg-red-700"
                    >
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
