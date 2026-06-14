"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/Toast";

type TextOverrides = Record<string, string>;
type ImageOverrides = Record<string, string>;

const TEXT_KEY = "empire-visual-editor-text";
const IMAGE_KEY = "empire-visual-editor-images";

const imageSlots = [
  { key: "logo", label: "Logo" },
  { key: "hero", label: "首页背景图" },
  { key: "network", label: "服务网络图" },
  { key: "founder", label: "老板照片" }
];

export function VisualEditor() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textOverrides, setTextOverrides] = useState<TextOverrides>({});
  const [imageOverrides, setImageOverrides] = useState<ImageOverrides>({});

  const exportText = useMemo(
    () =>
      JSON.stringify(
        {
          text: textOverrides,
          images: Object.fromEntries(Object.keys(imageOverrides).map((key) => [key, "已上传图片，请按页面预览替换到项目文件"]))
        },
        null,
        2
      ),
    [textOverrides, imageOverrides]
  );

  useEffect(() => {
    try {
      setTextOverrides(JSON.parse(window.localStorage.getItem(TEXT_KEY) || "{}") as TextOverrides);
      setImageOverrides(JSON.parse(window.localStorage.getItem(IMAGE_KEY) || "{}") as ImageOverrides);
    } catch {
      setTextOverrides({});
      setImageOverrides({});
    }
  }, []);

  useEffect(() => {
    if (document.documentElement.dataset.language && document.documentElement.dataset.language !== "zh-Hant") {
      applyImageOverrides(imageOverrides);
      return;
    }
    applyTextOverrides(textOverrides);
    applyImageOverrides(imageOverrides);
  }, [textOverrides, imageOverrides]);

  useEffect(() => {
    const editableItems = Array.from(document.querySelectorAll<HTMLElement>("[data-editable]"));

    editableItems.forEach((element) => {
      element.contentEditable = editMode ? "true" : "false";
      element.classList.toggle("visual-editing", editMode);
    });

    function handleBlur(event: FocusEvent) {
      const target = event.target as HTMLElement | null;
      const key = target?.dataset.editable;
      if (!key || !target) return;

      const nextText = target.innerText.trim();
      setTextOverrides((current) => {
        const next = { ...current, [key]: nextText };
        window.localStorage.setItem(TEXT_KEY, JSON.stringify(next));
        return next;
      });
    }

    editableItems.forEach((element) => element.addEventListener("blur", handleBlur));
    return () => {
      editableItems.forEach((element) => {
        element.contentEditable = "false";
        element.classList.remove("visual-editing");
        element.removeEventListener("blur", handleBlur);
      });
    };
  }, [editMode]);

  function applyTextOverrides(overrides: TextOverrides) {
    Object.entries(overrides).forEach(([key, value]) => {
      const element = document.querySelector<HTMLElement>(`[data-editable="${key}"]`);
      if (element && element.innerText !== value) element.innerText = value;
    });
  }

  function applyImageOverrides(overrides: ImageOverrides) {
    Object.entries(overrides).forEach(([key, value]) => {
      document.querySelectorAll<HTMLElement>(`[data-image-slot="${key}"]`).forEach((element) => {
        if (element instanceof HTMLImageElement) {
          element.src = value;
          return;
        }

        element.style.backgroundImage = `linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 72%, transparent) 42%, color-mix(in srgb, var(--bg) 22%, transparent) 100%), url("${value}")`;
      });
    });
  }

  function handleImageUpload(slot: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("请上传 PNG、JPG、SVG 等图片文件。");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result);
      const next = { ...imageOverrides, [slot]: value };
      setImageOverrides(next);

      try {
        window.localStorage.setItem(IMAGE_KEY, JSON.stringify(next));
        showToast("图片已应用到当前浏览器预览。上线前请让 Codex 帮你写入项目文件。");
      } catch {
        showToast("图片太大，浏览器保存失败。请压缩图片或直接放入 public/images。");
      }
    };
    reader.readAsDataURL(file);
  }

  async function copyExport() {
    try {
      await navigator.clipboard.writeText(exportText);
      showToast("已复制修改记录，直接粘贴发给我即可。");
    } catch {
      showToast("复制失败，请手动复制面板里的修改记录。");
    }
  }

  function resetPreview() {
    window.localStorage.removeItem(TEXT_KEY);
    window.localStorage.removeItem(IMAGE_KEY);
    setTextOverrides({});
    setImageOverrides({});
    showToast("本机预览修改已清空，页面即将刷新。");
    window.setTimeout(() => window.location.reload(), 600);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-5 z-[76] rounded-full px-5 py-3 text-sm font-semibold text-white shadow-gold"
        style={{ background: "var(--gold)" }}
      >
        维护
      </button>

      {open ? (
        <aside className="fixed bottom-20 right-4 z-[76] max-h-[78vh] w-[min(420px,calc(100vw-32px))] overflow-auto rounded-lg border p-5 shadow-gold" style={{ borderColor: "var(--border)", background: "var(--bg-soft)", color: "var(--text)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">可视化维护</h2>
              <p className="mt-1 text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                这里适合快速预览修改。正式上线前，把修改记录发给 Codex 固化进项目。
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full border px-3 py-1 text-sm" style={{ borderColor: "var(--border)" }}>
              关闭
            </button>
          </div>

          <div className="mt-5 rounded-md border p-4" style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">文字编辑模式</p>
                <p className="mt-1 text-xs leading-5" style={{ color: "var(--text-muted)" }}>开启后，点击页面上带金色虚线的文字即可直接修改。</p>
              </div>
              <button type="button" onClick={() => setEditMode((value) => !value)} className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: editMode ? "var(--gold-dark)" : "var(--gold)" }}>
                {editMode ? "关闭" : "开启"}
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <p className="font-semibold">上传图片</p>
            {imageSlots.map((slot) => (
              <label key={slot.key} className="flex cursor-pointer items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm" style={{ borderColor: "var(--border)" }}>
                <span>{slot.label}</span>
                <span className="rounded-full px-3 py-1 text-xs text-white" style={{ background: "var(--gold)" }}>选择图片</span>
                <input type="file" accept="image/*" className="hidden" onChange={(event) => handleImageUpload(slot.key, event)} />
              </label>
            ))}
          </div>

          <div className="mt-5 grid gap-3">
            <button type="button" onClick={copyExport} className="rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ background: "var(--gold)" }}>
              复制修改记录给 Codex
            </button>
            <button type="button" onClick={resetPreview} className="rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              清空本机预览修改
            </button>
          </div>

          <textarea value={exportText} readOnly rows={8} className="mt-5 w-full rounded-md border px-3 py-3 text-xs outline-none" style={{ borderColor: "var(--border)", background: "var(--bg-muted)", color: "var(--text)" }} />
        </aside>
      ) : null}
    </>
  );
}
