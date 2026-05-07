import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashBoardLayout";
import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";

import {
  Copy,
  Check,
  Link2,
  QrCode as QrCodeIcon,
  Send,
  Loader2,
} from "lucide-react";

import {QRCode} from "react-qr-code";

interface BatchType {
  id: string;
  name: string;
}

export default function GenerateInvite() {
  const user = getUser();

  const [batches, setBatches] = useState<
    BatchType[]
  >([]);

  const [selectedBatch, setSelectedBatch] =
    useState("");

  const [inviteLink, setInviteLink] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  // Fetch Batches
  const getBatches = async () => {
    try {
      const response = await API.get(
        `/batches/${user.id}`
      );

      setBatches(response.data.data || []);
    } catch (error) {
      console.log(
        "Failed to fetch batches",
        error
      );
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  // Generate Invite
  const generateInvite = async () => {
    try {
      setLoading(true);

      const response = await API.post(
        `/batches/invite`,
        {
          role: "trainer",
          id:selectedBatch
        }
      );

      setInviteLink(
        response.data.invite_link || ""
      );
    } catch (error) {
      console.log(
        "Failed to generate invite",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Copy Link
  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(
        inviteLink
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log(
        "Copy failed",
        error
      );
    }
  };

  // WhatsApp Share
  const shareWhatsapp = () => {
    const text = `Join my batch using this invite link:\n${inviteLink}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Generate Invite
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Create and share batch invite
            links with students
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
          {/* Batch Selection */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Batch
            </label>

            <select
              value={selectedBatch}
              onChange={(e) =>
                setSelectedBatch(
                  e.target.value
                )
              }
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-white"
            >
              <option value="">
                Select Batch
              </option>

              {batches.map((batch) => (
                <option
                  key={batch.id}
                  value={batch.id}
                >
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <button
            disabled={
              !selectedBatch || loading
            }
            onClick={generateInvite}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-2xl transition font-medium flex items-center justify-center gap-2"
          >
            {loading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            {loading
              ? "Generating..."
              : "Generate Invite Link"}
          </button>

          {/* Loading State */}
          {pageLoading && (
            <div className="mt-6 text-center text-sm text-gray-500">
              Loading batches...
            </div>
          )}

          {/* Invite Result */}
          {inviteLink && (
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-3xl p-5">
              {/* Title */}
              <div className="flex items-center gap-2 mb-4">
                <Link2
                  size={18}
                  className="text-indigo-600"
                />

                <h2 className="font-semibold text-gray-800">
                  Invite Link
                </h2>
              </div>

              {/* Link Container */}
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-3 py-3">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 outline-none text-sm text-gray-600 bg-transparent"
                />

                <button
                  onClick={copyInviteLink}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition text-sm font-medium"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Share Button */}
              <div className="mt-4">
                <button
                  onClick={shareWhatsapp}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl transition font-medium"
                >
                  <Send size={18} />
                  Share on WhatsApp
                </button>
              </div>

              {/* QR Code */}
              <div className="mt-8 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3">
                  <QrCodeIcon
                    size={18}
                    className="text-gray-700"
                  />

                  <p className="font-medium text-gray-700">
                    QR Code
                  </p>
                </div>

                <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm">
                  <QRCode
                    value={inviteLink}
                    size={180}
                    
                  />
                </div>

                <p className="text-xs text-gray-400 mt-3 text-center">
                  Students can scan this QR
                  code to join the batch
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}