using System;
using System.Drawing;
using System.Web;

namespace Harbor.Domain.Files
{
	public class FileFactory : IFileFactory
	{
		/// <summary>
		/// Saves the file to App_Data/users/[username]/[id].[ext],
		/// creates low and high res copies if needed,
		/// and returns a File ready to be saved by the repository including the file name, size, ext, and mime type.
		/// </summary>
		/// <param name="uploadedFile"></param>
		/// <returns></returns>
		public File CreateFile(string userName, HttpPostedFileBase uploadedFile)
		{
			var file = new File(userName, uploadedFile.FileName);
			var originalFilePath = file.GetPhysicalPath();
			var originalFileInfo = new System.IO.FileInfo(originalFilePath);
			if (originalFileInfo.Directory != null && !originalFileInfo.Directory.Exists)
			{
				System.IO.Directory.CreateDirectory(originalFileInfo.Directory.FullName);
			}
			uploadedFile.SaveAs(originalFilePath);


			// set file properties
			file.Ext = System.IO.Path.GetExtension(originalFilePath);
			file.ContentType = uploadedFile.ContentType;
			file.Size = uploadedFile.ContentLength;
			file.TotalSize = file.Size;

			createFileResolutions(ref file, originalFileInfo);
			return file;
		}

		private void createFileResolutions(ref File file, System.IO.FileInfo originalFileInfo)
		{
			if (!file.IsBitmap())
				return;

			var bmp = new Bitmap(originalFileInfo.FullName);
			resizeBitmapTo(FileResolution.High, bmp, ref file);
			resizeBitmapTo(FileResolution.Low, bmp, ref file);
		}

		private void resizeBitmapTo(FileResolution res, Bitmap source, ref File file)
		{
			var maxSize = (res == FileResolution.Low) ? File.LOWRES : File.HIGHRES;
			
			// don't create the res if original is smaller than the res
			var largeSide = Math.Max(source.Width, source.Height);
			if (largeSide <= maxSize)
				return;

			// create the image
			var ratioX = (double)maxSize / source.Width;
			var ratioY = (double)maxSize / source.Height;
            var ratio = Math.Min(ratioX, ratioY);
			var newWidth = (int)(source.Width * ratio);
			var newHeight = (int)(source.Height * ratio);
            var newImage = new Bitmap(newWidth, newHeight);
			using (Graphics g = Graphics.FromImage(newImage))
				g.DrawImage(source, 0, 0, newWidth, newHeight);
			

			// update the file properties and save the image to disk
			file.ResolutionsCreated = file.ResolutionsCreated.AddRes(res);
			var path = file.GetPhysicalPath(res);
			newImage.Save(path);
			file.TotalSize += new System.IO.FileInfo(path).Length;
		}
	}
}
