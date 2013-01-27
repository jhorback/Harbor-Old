using System;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Linq;
using System.Web.Mvc.Html;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		/// <summary>
		/// Use for simple properties to bind both a server and client side dto.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <typeparam name="TProperty"></typeparam>
		/// <param name="helper"></param>
		/// <param name="expression"></param>
		/// <param name="clientBinding"> </param>
		/// <returns></returns>
		public static MvcHtmlString JstPropFor<TModel, TProperty>(this HtmlHelper<TModel> helper,
			Expression<Func<TModel, TProperty>> expression, bool clientBinding = false)
		{
			string html = "";
			string propName = "";
			object propValue = "";

			
			// get the property name
			var body = expression.Body;
			if (body.NodeType == ExpressionType.Convert)
				body = ((UnaryExpression) body).Operand;
				
			if ((body as MemberExpression) != null)
				propName = (body as MemberExpression).Member.Name;
			
			// get the property value
			var metaData = helper.ViewContext.ViewData.ModelMetadata;
			if (metaData != null)
				propValue = expression.Compile().Invoke((TModel)metaData.Model);

			if (clientBinding == true)
			{
				html = string.Format(@"<span data-bind=""{0}"">{1}</span>", propName, propValue ?? "");			
			}
			else
			{
				// jch! how to tell if from server or client? - testing this now
				if (metaData != null)
				{
					html = propValue as string;
				}
				else
				{
					html = "{{" + propName + "}}";					
				}
			}

			return new MvcHtmlString(html);
		}
	}
}