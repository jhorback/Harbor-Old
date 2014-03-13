﻿
namespace Harbor.Domain.Pipeline
{
	public interface IPipeline<T>
	{
		void AddHandler<TH>() where TH : IPipelineHanlder<T>;
		void Execute(IPipelineContext<T> context);
	}
}
